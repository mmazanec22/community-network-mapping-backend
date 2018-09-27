A tiny lambda for the community-network-mapping project.

Needs two files:
1. claudia-env.json
```
{
  "REACT_APP_AIRTABLE_API_KEY": "key",
  "REACT_APP_AIRTABLE_BASE": "base"
}

```

1.  claudia.json
```
{
  "lambda": {
    "role": "community-network-mapping-server-executor",
    "name": "community-network-mapping-server",
    "region": "us-east-1"
  },
  "api": {
    "id": "id"
  }
}
```
