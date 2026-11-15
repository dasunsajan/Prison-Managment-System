// Initialize prison_db collections and indexes on first container startup
db = db.getSiblingDB("prison_db");

db.createCollection("staffs");
db.createCollection("people");
db.createCollection("invites");

db.staffs.createIndex({ username: 1 }, { unique: true });
db.people.createIndex({ type: 1, fullName: 1 });
db.invites.createIndex({ badgeNumber: 1 });

