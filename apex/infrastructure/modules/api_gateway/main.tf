
resource "aws_api_gateway_rest_api" "foo_api" {
  name = "foo_api"
  description = "This is my api gateway"
}

resource "aws_api_gateway_authorizer" "foo_authorizer" {
  name = "foo_authorizer"
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  authorizer_uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:express-to-aws-lambda_auth/invocations"
  authorizer_credentials = "${var.gateway_invoke_lambda_role_arn}"
}

# Resource
resource "aws_api_gateway_resource" "foo_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  parent_id = "${aws_api_gateway_rest_api.foo_api.root_resource_id}"
  path_part = "foo"
}

#Resource
resource "aws_api_gateway_resource" "foo_id_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  parent_id = "${aws_api_gateway_resource.foo_resource.id}"
  path_part = "{id}"
}

# Method
resource "aws_api_gateway_method" "foo_get_endpoint_method" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
  http_method = "GET"
  authorization = "NONE"
}

# Method Response
resource "aws_api_gateway_method_response" "foo_get_endpoint_method200" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
  http_method = "${aws_api_gateway_method.foo_get_endpoint_method.http_method}"
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
  response_parameters_in_json = <<PARAMS
  {
    "method.response.header.Location": true
  }
PARAMS
}

# Integration
resource "aws_api_gateway_integration" "foo_get_endpoint_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
  http_method = "${aws_api_gateway_method.foo_get_endpoint_method.http_method}"
  type = "AWS"
  credentials = "${var.gateway_invoke_lambda_role_arn}"
  # Must be POST for invoking Lambda function
  integration_http_method = "POST"
  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:express-to-aws-lambda_foo/invocations"
  request_templates = {
    "application/json" = "${file("${path.module}/request_mapping.template")}"
  }
}

# Integration -> *Integration Response* -> Method Response -> Client
resource "aws_api_gateway_integration_response" "foo_get_endpoint_integration_response" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
  http_method = "${aws_api_gateway_method.foo_get_endpoint_method.http_method}"
  status_code = "${aws_api_gateway_method_response.foo_get_endpoint_method200.status_code}"
  response_parameters_in_json = <<PARAMS
  {
    "method.response.header.Location": "integration.response.body.location"
  }
PARAMS
}

# POST Method
# Method
resource "aws_api_gateway_method" "foo_post_endpoint_method" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_resource.id}"
  http_method = "POST"
  authorization = "NONE"
}

# Method Response
resource "aws_api_gateway_method_response" "foo_post_endpoint_method200" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_resource.id}"
  http_method = "${aws_api_gateway_method.foo_post_endpoint_method.http_method}"
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
}

# Integration
resource "aws_api_gateway_integration" "foo_post_endpoint_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_resource.id}"
  http_method = "${aws_api_gateway_method.foo_post_endpoint_method.http_method}"
  type = "AWS"
  credentials = "${var.gateway_invoke_lambda_role_arn}"
  # Must be POST for invoking Lambda function
  integration_http_method = "POST"
  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:express-to-aws-lambda_foo/invocations"
  request_templates = {
    "application/json" = "${file("${path.module}/request_mapping.template")}"
  }
}

# Integration -> *Integration Response* -> Method Response -> Client
resource "aws_api_gateway_integration_response" "foo_post_endpoint_integration_response" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_resource.id}"
  http_method = "${aws_api_gateway_method.foo_post_endpoint_method.http_method}"
  status_code = "${aws_api_gateway_method_response.foo_post_endpoint_method200.status_code}"
}

# PUT Method
# Method
resource "aws_api_gateway_method" "foo_put_endpoint_method" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
  http_method = "PUT"
  authorization = "NONE"
}

# Method Response
resource "aws_api_gateway_method_response" "foo_put_endpoint_method200" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
  http_method = "${aws_api_gateway_method.foo_put_endpoint_method.http_method}"
  status_code = "200"
  response_models = {
    "application/json" = "Empty"
  }
}

# Integration
resource "aws_api_gateway_integration" "foo_put_endpoint_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
  http_method = "${aws_api_gateway_method.foo_put_endpoint_method.http_method}"
  type = "AWS"
  credentials = "${var.gateway_invoke_lambda_role_arn}"
  # Must be POST for invoking Lambda function
  integration_http_method = "POST"
  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:express-to-aws-lambda_foo/invocations"
  request_templates = {
    "application/json" = "${file("${path.module}/request_mapping.template")}"
  }
}

# Integration -> *Integration Response* -> Method Response -> Client
resource "aws_api_gateway_integration_response" "foo_put_endpoint_integration_response" {
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"
  http_method = "${aws_api_gateway_method.foo_put_endpoint_method.http_method}"
  status_code = "${aws_api_gateway_method_response.foo_put_endpoint_method200.status_code}"
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on=[
    "aws_api_gateway_integration.foo_get_endpoint_integration",
    "aws_api_gateway_integration.foo_post_endpoint_integration",
    "aws_api_gateway_integration.foo_put_endpoint_integration"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  stage_name = "${var.api_stage}"
  variables = {
    "functionAlias" = "${var.api_stage}"
  }
}
