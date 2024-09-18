
import { google } from 'googleapis';
import { Readable } from 'stream';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN
  },
  scopes: SCOPES,
});
console.log("idan 🚀  ~ auth:", auth);

const drive = google.drive({ version: 'v3', auth });

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.folderId && req.query.folderId !== 'undefined') {
        await listFiles(req, res);
      } else {
        await listRootFolders(req, res);
      }
      break;
    case 'POST':
      await getFileContent(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function listRootFolders(req, res) {
  try {
    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.folder'",
      fields: 'files(id, name, mimeType)',
    });
    const folders = response.data.files.filter(folder => folder.name !== 'אבא אתר');
    res.status(200).json(folders);
  } catch (error) {
    console.error('Error listing root folders:', error);
    res.status(500).json({ error: 'Failed to list root folders' });
  }
}

async function listFiles(req, res) {
  const { folderId, pageToken } = req.query;
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields:
        'nextPageToken, files(id, name, mimeType, size, modifiedTime, webContentLink, webViewLink, thumbnailLink)',
      pageSize: 100,
      pageToken: pageToken || null,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
}

async function getFileContent(req, res) {
  const { fileId } = req.body;
  try {
    const file = await drive.files.get({
      fileId: fileId,
      fields:
        'id, name, mimeType, webContentLink, webViewLink, thumbnailLink, size, modifiedTime, createdTime, description',
    });

    const response = await drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    const chunks = [];
    const stream = new Readable().wrap(response.data);

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    res.setHeader('Content-Type', file.data.mimeType);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${file.data.name}"`
    );
    res.send(buffer);
  } catch (error) {
    console.error('Error getting file content:', error);
    res.status(500).json({ error: 'Failed to get file content' });
  }
}

// import { google } from 'googleapis';
// import path from 'path';

// const SERVICE_ACCOUNT_KEY_FILE = path.join(
//   process.cwd(),
//   'config/service-account-key.json'
// );
// const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

// const auth = new google.auth.GoogleAuth({
//   keyFile: SERVICE_ACCOUNT_KEY_FILE,
//   scopes: SCOPES,
// });

// const drive = google.drive({ version: 'v3', auth });

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const response = await drive.files.list({
//         pageSize: 10, // Adjust the page size as needed
//         fields: 'files(id, name)',
//         q: 'trashed = false',
//       });

//       const files = response.data.files;
//       if (!files || files.length === 0) {
//         res.status(200).json({ message: 'No files found' });
//       } else {
//         res.status(200).json({ files });
//       }
//     } catch (error) {
//       console.error('Error listing files:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const { folderId } = req.body;
//       const response = await drive.files.list({
//         q: `'${folderId}' in parents`,
//         fields: 'files(id, name, mimeType, webViewLink, thumbnailLink)',
//       });
//       return response.data.files;
//     } catch (error) {
//       console.error('Error fetching folder contents:', error);
//       throw error;
//     }
//   }
//   //   const { fileId } = req.body;

//   //   try {
//   //     const response = await drive.files.get(
//   //       { fileId, alt: 'media' },
//   //       { responseType: 'arraybuffer' }
//   //     );

//   //     const contentType = response.headers['content-type'];
//   //     const data = Buffer.from(response.data);

//   //     res.setHeader('Content-Type', contentType);
//   //     res.send(data);
//   //   } catch (error) {
//   //     console.error('Error getting file:', error);
//   //     res.status(500).json({ error: 'Internal Server Error' });
//   //   }
//   // } else {
//   //   res.status(405).json({ message: 'Method Not Allowed' });
//   // }
// }
