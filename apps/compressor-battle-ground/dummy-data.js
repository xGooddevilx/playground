const longObject = {
    id: 1,
    name: "Sample Object",
    description: "This is a long object with many properties.",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: ["sample", "test", "long", "object"],
    details: {
        address: "123 Main St",
        city: "Metropolis",
        state: "CA",
        zip: "12345",
        country: "USA",
        coordinates: {
            lat: 37.7749,
            lng: -122.4194
        }
    },
    stats: {
        views: 1024,
        likes: 256,
        shares: 128,
        comments: 64
    },
    users: [
        { id: 1, name: "Alice", role: "admin" },
        { id: 2, name: "Bob", role: "editor" },
        { id: 3, name: "Charlie", role: "viewer" }
    ],
    settings: {
        theme: "dark",
        notifications: true,
        language: "en-US"
    },
    history: [
        { date: "2024-01-01", action: "created" },
        { date: "2024-02-01", action: "updated" },
        { date: "2024-03-01", action: "reviewed" }
    ],
    metadata: {
        version: "1.0.0",
        license: "MIT",
        contributors: ["Alice", "Bob", "Charlie"]
    },
    extra: {
        notes: "This object is for demonstration purposes.",
        flags: [true, false, true, false],
    }
};


module.exports = longObject