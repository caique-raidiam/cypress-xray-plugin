# Acquire bearer token.
# Don't forget to replace <xray-client-id> and <xray-client-secret> with your actual credentials.
TOKEN=$(curl --silent --location 'https://xray.cloud.getxray.app/api/v2/authenticate' \
--header 'Content-Type: application/json' \
--data '{
    "client_id":     "xray-client-id",
    "client_secret": "xray-client-secret"
}')
# Remove quotes from token.
TOKEN="${TOKEN//\"/}"
# Send import request.
curl --silent --location 'https://xray.cloud.getxray.app/api/v2/import/execution/cucumber/multipart' \
--header "Authorization: Bearer $TOKEN" \
--form 'results=@"cypress/generate-reports/cucumber-report.json"' \
--form 'info=@"cypress/generate-reports/info.json"'