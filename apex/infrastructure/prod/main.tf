
module "iam" {
  source = "../modules/iam"
}

module "api_gateway" {
  source         = "../modules/api_gateway"
  aws_account_id = "${var.aws_account_id}"
  aws_region     = "${var.aws_region}"

  api_stage      = "${var.api_stage}"

  gateway_invoke_lambda_role_arn = "${module.iam.gateway_invoke_lambda_role_arn}"
}
