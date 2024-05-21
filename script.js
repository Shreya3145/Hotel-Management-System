import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC0QCdxoDc-clWlR-MflPurxAEeHxcgngo",
  authDomain: "glacier.firebaseapp.com",
  databaseURL: "xxx", //add database URL
  projectId: "glacier",
  storageBucket: "glacier.appspot.com",
  messagingSenderId: "8300855******",
  appId: "1:830085524122:web:**********",
  measurementId: "G-0XYNM6N6PY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

function submit() {
  const user_name = document.getElementById("user__name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const payment = document.getElementById("payment").value;

  // Get the currently signed-in user
  const user = auth.currentUser;

  if (user) {
    // Validating email format
    if (!validate_email(email)) {
      alert("Invalid email format");
      return;
    }
    else {
    alert('User not authenticated');
  }
}

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
function saveMessage(name, email) {
  let newMessageRef = messagesRef.push();
  newMessageRef.set({
      name: name,
      email: email
  }
)};

  const user_data = {
    user_name: user_name,
    email: email,
    phone: phone,
    checkin: checkin,
    checkout: checkout,
    payment: payment
  };

  // Write user data to the database
  set(ref(database, 'users/' + user.uid), user_data)
    .then(() => {
      alert('Booking Confirmed');
    })
    .catch(error => {
      console.error("Error writing to database: ", error);
      alert('Failed to book. Please try again later.');
    });
}