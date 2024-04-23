import { S3, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function handleFileUpload(
    fileName: string,
    fileData: string, 
    courseID: string, 
    lessonID: string,
    fileType:string) {
    const appVersion = process.env.NEXT_PUBLIC_APP_VERSION!;
    const region = process.env.NEXT_PUBLIC_AWS_REGION!;
    const accessKeyId = process.env.NEXT_PUBLIC_AWS_IAM_USER_ACCESS_KEY!;
    const secretAccessKey = process.env.NEXT_PUBLIC_AWS_IAM_USER_SECRET_KEY!;
    const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_USERS_PROFILE!;
    const cloudfrontDomain = process.env.NEXT_PUBLIC_CLOUDFRONT_URL!;

    if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
        throw new Error('AWS configuration is missing');
    }

    let mimeType = 'application/octet-stream'; // Default MIME type
    let fileExtension = '';

    if (fileType.includes('image')) {
        mimeType = fileData.startsWith('data:image/jpeg') ? 'image/jpeg' : 'image/png';
        fileExtension = mimeType.split('/')[1];
    } else if (fileType.includes('pdf')) {
        mimeType = 'application/pdf';
        fileExtension = 'pdf';
    } else if (fileType.includes('text')) {
        mimeType = 'text/plain';
        fileExtension = 'txt';
    }

    const buffer = Buffer.from(fileData.replace(/^data:.+;base64,/, ""), 'base64');

    const s3client = new S3({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });

    //Clean up the file name
    fileName = fileName.replace(/[^a-zA-Z0-9]/g, '-');


    const params = {
        Bucket: bucketName,
        Key: `${appVersion}/courses/${courseID}/lessons/${lessonID}/${fileName}.${fileExtension}`,
        Body: buffer,
        ContentType: mimeType,
        Metadata: {
            course_id: courseID,
            lesson_id: lessonID,
        }
    };

    try {
        await s3client.send(new PutObjectCommand(params));
        
        const url = `${cloudfrontDomain}${params.Key}`;
        return url;
    } catch (err) {
        return err;
    }
}


export async function handleFileDelete(fileUrl: string) {
    const region = process.env.NEXT_PUBLIC_AWS_REGION!;
    const accessKeyId = process.env.NEXT_PUBLIC_AWS_IAM_USER_ACCESS_KEY!;
    const secretAccessKey = process.env.NEXT_PUBLIC_AWS_IAM_USER_SECRET_KEY!;
    const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_USERS_PROFILE!;
    const cloudfrontDomain = process.env.NEXT_PUBLIC_CLOUDFRONT_URL!;
    
    if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
        throw new Error('AWS configuration is missing');
    }

    // Assuming that the URL structure is: cloudfrontDomain + Key
    // We extract the Key from the URL by removing the cloudfrontDomain part.
    const key = fileUrl.replace(cloudfrontDomain, '');

    const s3client = new S3({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });

    const params = {
        Bucket: bucketName,
        Key: key
    };

    try {
        await s3client.send(new DeleteObjectCommand(params));
        return { message: "File deleted successfully" };
    } catch (err) {
        console.error("Error deleting the file:", err);
        return { error: "Error deleting the file" };
    }
}