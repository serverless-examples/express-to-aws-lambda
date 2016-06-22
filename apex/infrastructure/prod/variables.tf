variable "aws_account_id" {}

variable "aws_region" {
	default = "us-east-1"
}

variable "stage" {
	default = "prod"
}

variable "api_name" {
	default = "foo_api"
}

variable "api_stage" {
	default = "prod"
}
