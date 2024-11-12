const mqtt = require("mqtt");

// MQTT broker configuration
const brokerConfig = {
    host: process.env.MQTT_BROKER_HOST || "localhost",
    port: process.env.MQTT_BROKER_PORT || 1883,
    clientId: `mqtt_publisher_${Math.random().toString(16).slice(3)}`
};

// Create MQTT client
const client = mqtt.connect(
    `mqtt://${brokerConfig.host}:${brokerConfig.port}`,
    brokerConfig
);

// Topic to publish to
const TOPIC = "device/messages";

// Function to generate message
function generateMessage() {
    const timestamp = new Date();
    return {
        timestamp: timestamp.toISOString(),
        data: (Math.random() * 100).toFixed(2),
    };
}

// Connect handler
client.on("connect", () => {
    console.log("Connected to MQTT broker");
    console.log(`Start publishing to topic: ${TOPIC}`);

    // Publishing loop
    setInterval(() => {
        const message = generateMessage();

        client.publish(TOPIC, JSON.stringify(message), { qos: 1 }, (err) => {
            if (err) {
                console.error("Error publishing:", err);
            } else {
                console.log(
                    `[${message.timestamp}] Published message:`,
                    message
                );
            }
        });
    }, 5000); // Publish every 5 seconds
});

// Error handler
client.on("error", (err) => {
    console.error("MQTT client error:", err);
});

// Close handler
process.on("SIGINT", () => {
    client.end(true, () => {
        console.log("MQTT client disconnected");
        process.exit(0);
    });
});

// Log publish failures
client.on("error", (error) => {
    console.error("Publication error:", error);
});
