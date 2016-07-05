
resource "aws_sns_topic" "jobs_worker_topic" {
  name = "jobs_worker_topic"
  display_name = "Jobs Worker"
}

resource "aws_sns_topic_subscription" "jobs_worker_topic_subscription" {
  topic_arn = "${aws_sns_topic.jobs_worker_topic.arn}"
  protocol  = "lambda"
  endpoint  = "arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:express-to-aws-lambda_worker"
}
