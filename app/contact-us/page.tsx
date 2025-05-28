"use client";

import React from "react";
import { Card, Form, Input, Button, message } from "antd";
import { Mail } from "lucide-react";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const ContactUsPage: React.FC = () => {
  const [form] = Form.useForm<ContactFormValues>();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: ContactFormValues): void => {
    // TODO: Submit form data to the backend API and handle success and error responses
    console.log("Contact form submitted:", values);
    messageApi.open({
      type: "success",
      content: "Your message has been submitted successfully!",
    });
    form.resetFields();
  };

  return (
    <main className="px-8 py-20 bg-black text-gray-900">
      {contextHolder}
      <div className="max-w-lg mx-auto">
        <Card className="shadow-lg bg-gray-200">
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Mail size={32} />
            <span>Contact Us</span>
          </h1>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="mt-6 space-y-4"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your Name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email address" },
              ]}
            >
              <Input
                prefix={<Mail size={16} />}
                placeholder="you@example.com"
              />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter a message" }]}
            >
              <Input.TextArea rows={5} placeholder="Your message..." />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </main>
  );
};

export default ContactUsPage;
