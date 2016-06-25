
resource "aws_api_gateway_rest_api" "foo_api" {
  name = "${var.api_gateway_api_name}"
  description = "This is my api gateway"
}

# Resource
resource "aws_api_gateway_resource" "foo_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  parent_id = "${aws_api_gateway_rest_api.foo_api.root_resource_id}"
  path_part = "foo"
}

resource "aws_api_gateway_resource" "foo_get_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  parent_id = "${aws_api_gateway_resource.foo_resource.id}"
  path_part = "{id}"
}

# Method
resource "aws_api_gateway_method" "get_foo_method" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_get_resource.id}"
  http_method = "GET"
  authorization = "NONE"
}

# Method Response
resource "aws_api_gateway_method_response" "get_foo_method200" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_get_resource.id}"
  http_method = "${aws_api_gateway_method.get_foo_method.http_method}"
  status_code = "200"
}

# Integration
resource "aws_api_gateway_integration" "get_foo_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_get_resource.id}"
  http_method = "${aws_api_gateway_method.get_foo_method.http_method}"
  type = "AWS"                           # Documentation not clear
  integration_http_method = "GET"        # Not documented
  uri = "arn:aws:apigateway:${var.api_gateway_aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.api_gateway_aws_region}:${var.api_gateway_aws_account_id}:function:express-to-aws-lambda_foo/invocations"
  request_templates = {                  # Not documented
    "application/json" = "${file("${path.module}/api_gateway_body_mapping.template")}"
  }
}

# Integration -> *Integration Response* -> Method Response -> Client
resource "aws_api_gateway_integration_response" "KeysPUTIntegrationResponse" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_get_resource.id}"
  http_method = "${aws_api_gateway_method.get_foo_method.http_method}"
  status_code = "${aws_api_gateway_method_response.get_foo_method200.status_code}"
}

resource "aws_api_gateway_deployment" "prod" {
   depends_on = ["aws_api_gateway_integration.get_foo_integration"]

   rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
   stage_name = "prod"
}
