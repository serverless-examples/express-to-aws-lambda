
resource "aws_api_gateway_rest_api" "jobs_api" {
  name = "jobs_api"
  description = "This is my api gateway"
}

# Resource
resource "aws_api_gateway_resource" "jobs_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.jobs_api.id}"
  parent_id = "${aws_api_gateway_rest_api.jobs_api.root_resource_id}"
  path_part = "jobs"
}

# POST Method
# Method
resource "aws_api_gateway_method" "jobs_post_endpoint_method" {
  rest_api_id = "${aws_api_gateway_rest_api.jobs_api.id}"
  resource_id = "${aws_api_gateway_resource.jobs_resource.id}"
  http_method = "POST"
  authorization = "NONE"
}

# Method Response
resource "aws_api_gateway_method_response" "jobs_post_endpoint_method200" {
  rest_api_id = "${aws_api_gateway_rest_api.jobs_api.id}"
  resource_id = "${aws_api_gateway_resource.jobs_resource.id}"
  http_method = "${aws_api_gateway_method.jobs_post_endpoint_method.http_method}"
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
}

# Integration
resource "aws_api_gateway_integration" "jobs_post_endpoint_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.jobs_api.id}"
  resource_id = "${aws_api_gateway_resource.jobs_resource.id}"
  http_method = "${aws_api_gateway_method.jobs_post_endpoint_method.http_method}"
  type = "AWS"
  credentials = "${var.gateway_invoke_lambda_role_arn}"
  # Must be POST for invoking Lambda function
  integration_http_method = "POST"
  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:express-to-aws-lambda_jobs/invocations"
  request_templates = {
    "application/json" = "${file("${path.module}/request_mapping.template")}"
  }
}

# Integration -> *Integration Response* -> Method Response -> Client
resource "aws_api_gateway_integration_response" "jobs_post_endpoint_integration_response" {
  rest_api_id = "${aws_api_gateway_rest_api.jobs_api.id}"
  resource_id = "${aws_api_gateway_resource.jobs_resource.id}"
  http_method = "${aws_api_gateway_method.jobs_post_endpoint_method.http_method}"
  status_code = "${aws_api_gateway_method_response.jobs_post_endpoint_method200.status_code}"
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on=[
    "aws_api_gateway_integration.jobs_post_endpoint_integration"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.jobs_api.id}"
  stage_name = "${var.api_stage}"
  variables = {
    "functionAlias" = "${var.api_stage}"
  }
}
