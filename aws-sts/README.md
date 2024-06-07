# Security Token Service (STS)

An example of using the AWS Security Token Service (STS) to create temporary credentials for an IAM user to access AWS resources.
The example uses the temporary credentials received from STS to log a user into a Cognito User Pool.

## Running the example
Configure an AWS CLI profile with the credentials of an IAM user that has the necessary permissions to call the STS AssumeRole API.
This can be done by setting the environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` or by creating a profile in `~/.aws/credentials`.

Other environment variables that need to be set:
```
AWS_REGION=
ROLE_ARN=
ROLE_SESSION_NAME=
COGNITO_USER_POOL_ID=
COGNITO_CLIENT_ID=
```

Then run the example with the following command:
```sh
$ npm start
```
