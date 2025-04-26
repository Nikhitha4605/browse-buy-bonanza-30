
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll be in touch soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Have questions or feedback? We'd love to hear from you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) =>
                      setFormData({ ...formData, subject: value })
                    }
                    required
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer Support">
                        Customer Support
                      </SelectItem>
                      <SelectItem value="Order Inquiry">
                        Order Inquiry
                      </SelectItem>
                      <SelectItem value="Product Question">
                        Product Question
                      </SelectItem>
                      <SelectItem value="Returns & Refunds">
                        Returns & Refunds
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-lg shadow p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <p className="text-gray-600">support@snapshop.com</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (123) 456-7890</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 E-Commerce Street
                      <br />
                      Shopping City, SC 12345
                      <br />
                      India
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9AM - 6PM EST
                      <br />
                      Saturday: 10AM - 4PM EST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      How long does shipping take?
                    </h3>
                    <p className="text-gray-600">
                      Standard shipping typically takes 3-5 business days within India.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      What is your return policy?
                    </h3>
                    <p className="text-gray-600">
                      We offer a 30-day return policy for most items. Please see our returns page for more details.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      Do you ship internationally?
                    </h3>
                    <p className="text-gray-600">
                      Yes, we ship to select countries. International shipping typically takes 7-14 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
