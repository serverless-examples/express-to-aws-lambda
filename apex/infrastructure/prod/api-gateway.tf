variable "apex_function_foo" {}

resource "aws_api_gateway_rest_api" "foo_api" {
  name = "express-to-aws-lambda-apex"
  description = "This is my api gateway"
}

# Resource
resource "aws_api_gateway_resource" "foo_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  parent_id = "${aws_api_gateway_rest_api.foo_api.root_resource_id}"
  path_part = "foo"
}

# Method
resource "aws_api_gateway_method" "get_foo_method" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_resource.id}"
  http_method = "GET"
  authorization = "NONE"
}

# Integration
resource "aws_api_gateway_integration" "get_foo_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_resource.id}"
  http_method = "${aws_api_gateway_method.get_foo_method.http_method}"
  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.apex_function_foo}/invocations"
  type = "AWS"                           # Documentation not clear
  integration_http_method = "GET"        # Not documented
  request_templates = {                  # Not documented
    "application/json" = "${file("api_gateway_body_mapping.template")}"
  }
}

resource "aws_api_gateway_deployment" "prod" {
   depends_on = ["aws_api_gateway_integration.get_foo_integration"]

   rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
   stage_name = "prod"
}
