
#Resource 
resource "aws_api_gateway_resource" "resource" {
  rest_api_id = "${var.rest_api_id}"
  parent_id = "${var.parent_resource_id.id}"
  path_part = "${var.path_part}"
}

# Method
resource "aws_api_gateway_method" "method" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${aws_api_gateway_resource.resource.id}"
  http_method = "${var.http_method}"
  authorization = "${var.authorization}"
}

# Method Response
resource "aws_api_gateway_method_response" "method200" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${aws_api_gateway_resource.resource.id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
}

# Integration
resource "aws_api_gateway_integration" "integration" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${aws_api_gateway_resource.resource.id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  type = "AWS"
  credentials = "${var.api_gateway_invoke_lambda_role_arn}"
  # Must be POST for invoking Lambda function
  integration_http_method = "POST"
  uri = "arn:aws:apigateway:${var.api_gateway_aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.api_gateway_aws_region}:${var.api_gateway_aws_account_id}:function:${var.lambda_function_name}/invocations"
  request_templates = {
    "application/json" = "${file("${path.module}/api_gateway_body_mapping.template")}"
  }
}

# Integration -> *Integration Response* -> Method Response -> Client
resource "aws_api_gateway_integration_response" "integration_response" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${aws_api_gateway_resource.resource.id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  status_code = "${aws_api_gateway_method_response.method200.status_code}"
}

resource "aws_api_gateway_deployment" "prod" {
   depends_on = ["aws_api_gateway_integration.integration"]

   rest_api_id = "${var.rest_api_id}"
   stage_name = "${var.stage_name}"
}
