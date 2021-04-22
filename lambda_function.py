import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('PresenceDatabase')



def lambda_handler(event, context):
    
    lich = 0;
    now = str(event["dateTime"]).lstrip("{\'S\': \'").rstrip("\'}");

    try:
        response = table.get_item(Key={'ID': 0})
        item = response['Item']
        lich = item['lich']
    except KeyError:
        response = table.put_item(
            Item={
                'ID': 0,
                'Time': now,
                'lich': lich
                })
    
    lich += 1
    
    response = table.put_item(
       Item={
            'ID': lich,
            'Time': now
            })

    response = table.update_item(
            Key={
                'ID': 0,
            },
            UpdateExpression='SET lich = :val1',
            ExpressionAttributeValues={
                ':val1': lich
            }
            )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Thank you, your presence has been noted.')
    }