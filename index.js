const express = require('express');
const { resolve } = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message/reply';
const LINE_HEADER = {
  'Content-Type': 'application/json',
  Authorization: `Bearer vF095mH2bOdawUJqgLxQxePXyGz92HXn1QehIQEpoRqYMENNluRbYDLGuDXR85TRtsQYV+jAGyjgOoQoH9GTWSWgM6ac+DGJ/o07qQ/3QxMrvSaijk6lEJT0R4TeRpoAql8U+Jiiejw6fj5kpxjPigdB04t89/1O/w1cDnyilFU=`,
};

app.post('/webhook', (req, res) => {
  if (req.method === 'POST') {
    const bodyResponse = req.body;
    res.send({
      method: `POST`,
      uri: LINE_MESSAGING_API,
      headers: LINE_HEADER,
      body: JSON.stringify({
        replyToken: bodyResponse.events[0].replyToken,
        messages: [
          {
            type: `text`,
            text: JSON.stringify(bodyResponse),
          },
        ],
      }),
    });
  } else {
    return res.status(200).send(`Done`);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
