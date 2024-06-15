import { CognitoIdentityProviderClient, AdminInitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

export const CognitoClient = (region, credentials) => new CognitoIdentityProviderClient({
    region,
    credentials: {
        accessKeyId: credentials.AccessKeyId,
        secretAccessKey: credentials.SecretAccessKey,
        sessionToken: credentials.SessionToken
    },
});

export const cognitoLogin = async (cognitoClient, username, password) => {
    const loginCommand = new AdminInitiateAuthCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
        },
    });

    return cognitoClient.send(loginCommand);
}
