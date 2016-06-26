
resource "aws_api_gateway_rest_api" "foo_api" {
  name = "${var.api_name}"
  description = "This is my api gateway"
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

module "foo_get_endpoint" {
  source = "../api_gateway_endpoint"
  stage_name = "${var.api_stage}"

  api_gateway_aws_account_id = "${var.aws_account_id}"
  api_gateway_aws_region = "${var.aws_region}"
  api_gateway_invoke_lambda_role_arn = "${var.gateway_invoke_lambda_role_arn}"

  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"

  http_method = "GET"
  lambda_function_name = "express-to-aws-lambda_foo"
}

module "foo_post_endpoint" {
  source = "../api_gateway_endpoint"
  stage_name = "${var.api_stage}"

  api_gateway_aws_account_id = "${var.aws_account_id}"
  api_gateway_aws_region = "${var.aws_region}"
  api_gateway_invoke_lambda_role_arn = "${var.gateway_invoke_lambda_role_arn}"

  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_resource.id}"

  http_method = "POST"
  lambda_function_name = "express-to-aws-lambda_foo"
}

module "foo_put_endpoint" {
  source = "../api_gateway_endpoint"
  stage_name = "${var.api_stage}"

  api_gateway_aws_account_id = "${var.aws_account_id}"
  api_gateway_aws_region = "${var.aws_region}"
  api_gateway_invoke_lambda_role_arn = "${var.gateway_invoke_lambda_role_arn}"

  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"

  http_method = "PUT"
  lambda_function_name = "express-to-aws-lambda_foo"
}

module "foo_delete_endpoint" {
  source = "../api_gateway_endpoint"
  stage_name = "${var.api_stage}"

  api_gateway_aws_account_id = "${var.aws_account_id}"
  api_gateway_aws_region = "${var.aws_region}"
  api_gateway_invoke_lambda_role_arn = "${var.gateway_invoke_lambda_role_arn}"

  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  resource_id = "${aws_api_gateway_resource.foo_id_resource.id}"

  http_method = "DELETE"
  lambda_function_name = "express-to-aws-lambda_foo"
}
