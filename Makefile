deploy:
	sam package --template-file template.yml --output-template-file packaged.yml --s3-bucket sampack-97068
	sam deploy --template-file ./packaged.yml --stack-name mystack --capabilities CAPABILITY_IAM 

delete:
	aws cloudformation delete-stack --stack-name mystack
