
module "iam" {
   source = "../modules/iam"
}

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

module "foo_get_endpoint" {
  source = "../modules/api_gateway_endpoint"
  stage_name = "${var.api_stage}"

  api_gateway_aws_account_id = "${var.aws_account_id}"
  api_gateway_aws_region = "${var.aws_region}"
  api_gateway_invoke_lambda_role_arn = "${module.iam.gateway_invoke_lambda_role_arn}"

  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  parent_resource_id = "${aws_api_gateway_resource.foo_resource.id}"

  path_part = "{id}"
  http_method = "GET"
  lambda_function_name = "express-to-aws-lambda_foo"
}

module "foo_post_endpoint" {
  source = "../modules/api_gateway_endpoint"
  stage_name = "${var.api_stage}"

  api_gateway_aws_account_id = "${var.aws_account_id}"
  api_gateway_aws_region = "${var.aws_region}"
  api_gateway_invoke_lambda_role_arn = "${module.iam.gateway_invoke_lambda_role_arn}"

  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  parent_resource_id = "${aws_api_gateway_resource.foo_resource.id}"

  path_part = ""
  http_method = "POST"
  lambda_function_name = "express-to-aws-lambda_foo"
}

module "foo_get_endpoint" {
  source = "../modules/api_gateway_endpoint"
  stage_name = "${var.api_stage}"

  api_gateway_aws_account_id = "${var.aws_account_id}"
  api_gateway_aws_region = "${var.aws_region}"
  api_gateway_invoke_lambda_role_arn = "${module.iam.gateway_invoke_lambda_role_arn}"

  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  parent_resource_id = "${aws_api_gateway_resource.foo_resource.id}"

  path_part = "{id}"
  http_method = "PUT"
  lambda_function_name = "express-to-aws-lambda_foo"
}

module "foo_get_endpoint" {
  source = "../modules/api_gateway_endpoint"
  stage_name = "${var.api_stage}"

  api_gateway_aws_account_id = "${var.aws_account_id}"
  api_gateway_aws_region = "${var.aws_region}"
  api_gateway_invoke_lambda_role_arn = "${module.iam.gateway_invoke_lambda_role_arn}"

  rest_api_id = "${aws_api_gateway_rest_api.foo_api.id}"
  parent_resource_id = "${aws_api_gateway_resource.foo_resource.id}"

  path_part = "{id}"
  http_method = "DELETE"
  lambda_function_name = "express-to-aws-lambda_foo"
}

output "lambda_function_role_id" {
   value = "${module.iam.lambda_function_role_id}"
}
