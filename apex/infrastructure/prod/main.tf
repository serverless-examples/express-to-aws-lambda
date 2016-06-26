
module "iam" {
  source = "../modules/iam"
}


module "api_gateway" {
  source = "../modules/iam"
  aws_account_id = "${var.aws_account_id}"
  aws_region = "${var.aws_region}"

  api_name = "${var.api_name}"
  api_stage = "${var.api_stage}"

  gateway_invoke_lambda_role_arn = "${module.iam.gateway_invoke_lambda_role_arn}"
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = "${module.api_gateway.api_id}"
  stage_name = "${var.api_stage}"
  variables = {
    "functionAlias" = "${var.api_stage}"
  }
}

output "api_gateway_id" {
  value = "${module.api_gateway.api_id}"
}

output "lambda_function_role_id" {
  value = "${module.iam.lambda_function_role_id}"
}
