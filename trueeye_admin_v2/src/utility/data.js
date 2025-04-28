
export const sites = ([
  { name: "Site A" },
  { name: "Site B" },
  { name: "Site C" },
  { name: "Site D" },
  { name: "Site E" },
  { name: "Site F" },
  { name: "Site G" },
  { name: "Site H" },
]);

export const cameras = ([
  { name: "Camera A" },
  { name: "Camera B" },
  { name: "Camera C" },
  { name: "Camera D" },
  { name: "Camera E" },
  { name: "Camera F" },
  { name: "Camera G" },
  { name: "Camera H" },
]);

export const setAttributes = ([
  { name: "Master Set" },
  { name: "Set B" },
  { name: "Set C" },
  { name: "Set D" },
  { name: "Set E" },
  { name: "Set F" },
  { name: "Set G" },
  { name: "Set H" },
]);

export const attributes = ([
  { key: "Attribute A", value: "AAA" },
  { key: "Attribute B", value: "BBB" },
  { key: "Attribute C", value: "CCC" },
  { key: "Attribute D", value: "DDD" },
  { key: "Attribute E", value: "EEE" },
  { key: "Attribute F", value: "FFF" },
  { key: "Attribute G", value: "GGG" },
  { key: "Attribute H", value: "HHH" },
]);

export const defaultAttributes = ["Attribute A", "Attribute B"];

export const users = ([
    { id: 1, name: "John Doe", role: "Admin", email: "john.doe@example.com"
    },
    { id: 2, name: "Jane Smith", role: "User", email: "jane.smith@example.com"
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "Moderator",
      email: "michael.johnson@example.com",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Admin",
      email: "emily.davis@example.com",
    },
    { id: 5, name: "Chris Lee", role: "User", email: "chris.lee@example.com"
    },
    {
      id: 6,
      name: "Patricia Brown",
      role: "Moderator",
      email: "patricia.brown@example.com",
    },
    {
      id: 7,
      name: "Michael Williams",
      role: "Admin",
      email: "michael.williams@example.com",
    },
    {
      id: 8,
      name: "Sarah Jones",
      role: "User",
      email: "sarah.jones@example.com",
    },
    {
      id: 9,
      name: "David Miller",
      role: "Moderator",
      email: "david.miller@example.com",
    },
    {
      id: 10,
      name: "Susan Wilson",
      role: "Admin",
      email: "susan.wilson@example.com",
    },
    {
      id: 11,
      name: "Robert Moore",
      role: "User",
      email: "robert.moore@example.com",
    },
    {
      id: 12,
      name: "Jessica Taylor",
      role: "Moderator",
      email: "jessica.taylor@example.com",
    },
    {
      id: 13,
      name: "Daniel Anderson",
      role: "Admin",
      email: "daniel.anderson@example.com",
    },
    {
      id: 14,
      name: "Laura Thomas",
      role: "User",
      email: "laura.thomas@example.com",
    },
    {
      id: 15,
      name: "Matthew Jackson",
      role: "Moderator",
      email: "matthew.jackson@example.com",
    },
    {
      id: 16,
      name: "Anna White",
      role: "Admin",
      email: "anna.white@example.com",
    },
    {
      id: 17,
      name: "James Harris",
      role: "User",
      email: "james.harris@example.com",
    },
    {
      id: 18,
      name: "Linda Martin",
      role: "Moderator",
      email: "linda.martin@example.com",
    },
    {
      id: 19,
      name: "Paul Thompson",
      role: "Admin",
      email: "paul.thompson@example.com",
    },
    {
      id: 20,
      name: "Nancy Garcia",
      role: "User",
      email: "nancy.garcia@example.com",
    },
    {
      id: 21,
      name: "Steven Martinez",
      role: "Moderator",
      email: "steven.martinez@example.com",
    },
    {
      id: 22,
      name: "Karen Robinson",
      role: "Admin",
      email: "karen.robinson@example.com",
    },
    {
      id: 23,
      name: "Andrew Clark",
      role: "User",
      email: "andrew.clark@example.com",
    },
    {
      id: 24,
      name: "Barbara Rodriguez",
      role: "Moderator",
      email: "barbara.rodriguez@example.com",
    },
    {
      id: 25,
      name: "Mark Lewis",
      role: "Admin",
      email: "mark.lewis@example.com",
    },
    {
      id: 26,
      name: "Lisa Walker",
      role: "User",
      email: "lisa.walker@example.com",
    },
    {
      id: 27,
      name: "Kevin Hall",
      role: "Moderator",
      email: "kevin.hall@example.com",
    },
    {
      id: 28,
      name: "Deborah Allen",
      role: "Admin",
      email: "deborah.allen@example.com",
    },
    {
      id: 29,
      name: "Joshua Young",
      role: "User",
      email: "joshua.young@example.com",
    },
    {
      id: 30,
      name: "Sharon Hernandez",
      role: "Moderator",
      email: "sharon.hernandez@example.com",
    },
]);
  

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

const urlencoded = new URLSearchParams();
urlencoded.append("username", "trueeye_admin");
urlencoded.append("password", "trueeye_adminpwd");
urlencoded.append("client_id", "TRUEEYE_SERVICE");
urlencoded.append("grant_type", "password");
urlencoded.append("client_secret", "VA3GHImiEK8wzEpwmFg2ixuzfRFDwU7C");
urlencoded.append("scope", "openid");

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow"
};

fetch("https://id.trueeye.co/realms/master/protocol/openid-connect/token", requestOptions)
  // .then((response) => response.text())
  // .then((result) => console.log(result))
  .then(response => response.json()) 
  .then(result => {
    if (result.access_token) {
      console.log(result.access_token);
    } else {
      console.error("Access token not found in the response.");
    }
  })
  .catch((error) => console.error(error));