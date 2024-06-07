import { read } from "read";
import { StsClient, assumeRole } from "./sts.js";
import { CognitoClient, cognitoLogin } from "./cognito.js";

const startLogin = async (cognitoClient) => {
    const username = await read({ prompt: 'Enter username/email: ' });
    const password = await read({ prompt: 'Enter password: ', silent: true, replace: '*' });

    try {
        const loginResponse = await cognitoLogin(cognitoClient, username, password);
        console.log(loginResponse.$metadata.httpStatusCode === 200 ? 'Login successful' : 'Login failed');
    } catch (err) {
        console.log(`Login failed: ${err}`);
    }
};

const main = async () => {
    try {
        const stsClient = StsClient(process.env.AWS_REGION);
        const credentials = await assumeRole(stsClient, process.env.ROLE_ARN, process.env.ROLE_SESSION_NAME);
        console.log({ credentials });

        const cognitoClient = CognitoClient(process.env.AWS_REGION, credentials);
        await startLogin(cognitoClient);

        while (true) {
            const loginAgain = await read({ prompt: 'Log in again? y/n ', default: 'y'});

            if (loginAgain === 'y') {
                await startLogin(cognitoClient);
            } else {
                break;
            }
        }
    } catch (err) {
        console.error(err);
    }
}

await main();
