// Define a Stream class - to get all the unique userids with buffer size constraint

class Stream {
    constructor(k) {
        this.buffer = []; // initialize an empty buffer
        this.uniqueIds = new Set(); // initialize an empty set for storing unique user ids
        this.k = k; // set the buffer size to k
    }

    // Add a new data point to the buffer
    addDataPoint(userId, time) {
        // If the buffer is full, remove the oldest data point
        if (this.buffer.length >= this.k) {
            const oldestDataPoint = this.buffer.shift();
            // If the removed data point has a unique userId, remove it from the set of unique userIds
            if (!this.buffer.includes(oldestDataPoint)) {
                this.uniqueIds.delete(oldestDataPoint);
            }
        }


        // Add the new data point to the buffer
        this.buffer.push(userId);

        // If the userId is unique, add it to the set of unique userIds
        if (!this.uniqueIds.has(userId)) {
            this.uniqueIds.add(userId);
        }
    }

    // Get the set of unique userIds in the buffer
    getUniqueIds() {
        return this.uniqueIds;
    }
}

// Example usage:
const stream = new Stream(5); // create a stream with buffer size 5
stream.addDataPoint(1, new Date()); // add a data point with userId 1
stream.addDataPoint(2, new Date()); // add a data point with userId 2
stream.addDataPoint(3, new Date()); // add a data point with userId 3
stream.addDataPoint(1, new Date()); // add a data point with userId 1 (which is already in the buffer)
stream.addDataPoint(4, new Date()); // add a data point with userId 4
stream.addDataPoint(5, new Date()); // add a data point with userId 5
stream.addDataPoint(6, new Date()); // add a data point with userId 6 (which replaces the oldest data point with userId 2)
console.log(stream.getUniqueIds()); // output: Set {1, 3, 4, 5, 6} (since userId 2 was removed from the buffer)
