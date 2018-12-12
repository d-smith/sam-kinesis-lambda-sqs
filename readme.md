# sam-kinesis-lambda-sqs

Read from a stream, write to a queue, build using SAM.

## Misc

Write to the stream:

```console
aws kinesis put-record --stream-name K3Stream-dev --dataFoobar --partition-key foo
```

Get logs

```console
sam logs --name StreamProcessor-dev
```