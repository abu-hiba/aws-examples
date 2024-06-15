import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

export const StsClient = (region) => new STSClient({ region });

export const assumeRole = async (stsClient, roleArn, roleSessionName, durationSeconds) => {
    try {
        const command = new AssumeRoleCommand({
            RoleArn: roleArn,
            RoleSessionName: roleSessionName,
            DurationSeconds: durationSeconds || 900,
        });

        const stsResponse = await stsClient.send(command);
        return stsResponse.Credentials;
    } catch (err) {
        throw err;
    }
};
