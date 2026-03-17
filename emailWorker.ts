import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sqs = new SQSClient({
    region: "us-east-1",
    endpoint: "http://localhost:4566",
    credentials: { accessKeyId: "test", secretAccessKey: "test"},
});

const ses = new SESClient({
    region: "us-east-1",
    endpoint: "http://localhost:4566",
    credentials: { accessKeyId: "test", secretAccessKey: "test"},
});

const QUEUE_URL = "http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/email-notif-queue";

async function processMessages() {
    console.log("worker started waiting for messages");

    while (true) {
        const response = await sqs.send(new ReceiveMessageCommand({
            QueueUrl: QUEUE_URL,
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 20,
        }));

        if (!response.Messages?.length) {
            console.log("no messages polling again");
            continue;
        }

        for (const message of response.Messages) {
            try {
                const snsWrapper = JSON.parse(message.Body!);
                const order = JSON.parse(snsWrapper.Message);

                console.log("Processing order: ", order);

                await ses.send(new SendEmailCommand({
                    Source: "foreverlydusk@gmail.com",
                    Destination: {
                        ToAddresses: [order.email],
                    },
                    Message: {
                        Subject: {
                            Data: `Order Confirmation #${order.orderId}`,
                        },
                        Body: {
                            Text: {
                                Data:
                                    `
                                    Your order has been confirmed!
                                    Order ID: ${order.orderId}
                                    Total: $${order.totalPrice}
                                    Shipping to: ${order.shippingAddress}

                                    `,
                                },
                            },
                        },
                    }));

                    console.log(`Email sent to ${order.email} for order ${order.orderId}`);

                    await sqs.send(new DeleteMessageCommand({
                        QueueUrl: QUEUE_URL,
                        ReceiptHandle: message.ReceiptHandle!,
                    }));

                    console.log("Message deleted from queue");
            } catch (err) {
                console.error("failed to process the message:", err);
            }
        }
    }
}

processMessages();