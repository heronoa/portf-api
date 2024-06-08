// import { DeleteObjectCommandOutput, S3 } from "@aws-sdk/client-s3";
// import https from "https";
// import { NodeHttpHandler } from "@smithy/node-http-handler";
// import { randomUUID } from "crypto";
// import { Upload } from "@aws-sdk/lib-storage";
// import { DeleteObjectCommand } from "@aws-sdk/client-s3";

// interface AWSBucketRef {
//   $metadata: {
//     httpStatusCode: number;
//     requestId: string;
//     extendedRequestId: string;
//     cfId: any;
//     attempts: number;
//     totalRetryDelay: number;
//   };
//   ETag: string;
//   ServerSideEncryption: string;
//   Bucket: string;
//   Key: string;
//   Location: string;
// }

// const s3_client_params = {
//   region: process.env?.AWS_BUCKET_REGION || "",
//   credentials: {
//     accessKeyId: process.env?.BUCKET_ACESS_KEY || "",
//     secretAccessKey: process.env?.BUCKET_SECRET_KEY || "",
//   },
//   forcePathStyle: true,
//   requestHandler: new NodeHttpHandler({
//     httpsAgent: new https.Agent({
//       keepAlive: true,
//       rejectUnauthorized: false,
//     }),
//   }),
// };

// export const s3 = new S3(s3_client_params);

// export const uploadAWS = async (file: {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   size: number;
//   buffer: any;
// }): Promise<AWSBucketRef | any> => {
//   try {
//     const parallelUploads3 = new Upload({
//       client: s3,
//       // queueSize: 4, // optional concurrency configuration
//       leavePartsOnError: false, // optional manually handle dropped parts
//       params: {
//         Bucket: process.env.S3_BUCKET,
//         Key: `${Date.now().toString()}-${randomUUID()}-${file.originalname}`,
//         Body: file.buffer,
//         ACL: "public-read",
//         ContentType: file.mimetype,
//       },
//     });

//     parallelUploads3.on("httpUploadProgress", progress => {
//       console.log(progress);
//     });

//     const result = await parallelUploads3.done();

//     return result;
//   } catch (err) {
//     console.log(err);

//     return JSON.stringify(err);
//   }
// };

// const getFileFromUrlKey = (url: string) => {
//   console.log({ url });

//   if (typeof url !== "string") {
//     return null;
//   }

//   return url?.split("?")[0].split("/").pop();
// };

// export const deleteFromAWS = async (
//   fileUrl: string,
// ): Promise<DeleteObjectCommandOutput | any> => {
//   if (!fileUrl) {
//     return true;
//   }

//   const fileName = getFileFromUrlKey(fileUrl || "");

//   if (!fileName) {
//     return true;
//   }

//   const client = s3;
//   const input = {
//     Bucket: process.env.S3_BUCKET,
//     Key: fileName,
//   };
//   const command = new DeleteObjectCommand(input);
//   const response = await client.send(command);

//   return response;
// };
