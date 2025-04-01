const autocannon = require('autocannon');

const url = 'http://localhost:3000/api/users/update_balance';
const bodyData = { userId: 1,  amount: 2 };


const test = autocannon({
  url,
  connections: 10, // 10 concurrent users
  duration: 50, // 50 seconds test duration
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bodyData)
}, (err, res) => {
  if (err) {
    console.error('❌ Error running load test:', err);
  } else {
    console.log('Load Test Results:', res);
  }
});

autocannon.track(test, { renderProgressBar: true });
