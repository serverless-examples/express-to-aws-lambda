variable "stage_name" {}

variable "api_gateway_aws_region" {}
variable "api_gateway_aws_account_id" {}
variable "api_gateway_invoke_lambda_role_arn" {}

variable "rest_api_id" {}
variable "parent_resource_id" {}

variable "path_part" {}
variable "http_method" {}
variable "authorization" {
  default: "NONE"
}
variable "lambda_function_name" {}
