"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import Container from "@/components/common/Container";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import LandingHeader from "@/components/HomePage/Header";
import LandingFooter from "@/components/HomePage/Footer";

export default function ContactContainer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate contact form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Thank you! Your message has been sent successfully.");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <LandingHeader />

      <main className="flex-1 py-12 sm:py-16">
        <Container className="space-y-12">
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge
              variant="secondary"
              className="bg-orange-500/10 text-orange-600 border-orange-200 text-xs font-semibold px-3 py-1 rounded-full"
            >
              Get in Touch
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Contact Us
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base">
              Have questions, feedback, or need assistance? Reach out to the Bincoz support team.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-6 sm:p-8 space-y-6 bg-orange-50/60 dark:bg-orange-950/20 border-orange-200/80 dark:border-orange-900/40">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                  <span>Contact Information</span>
                </h2>

                <div className="space-y-5 text-sm">
                  {/* Phone / WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 shrink-0 mt-0.5">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Phone & WhatsApp</div>
                      <div className="text-muted-foreground">+91 XXXXXXX</div>
                      <div className="text-xs text-muted-foreground/80 mt-0.5">
                        Mon - Sat, 9:00 AM - 7:00 PM
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 shrink-0 mt-0.5">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Email Address</div>
                      <div className="text-muted-foreground">support@bincoz.in</div>
                      <div className="text-muted-foreground">info@bincoz.in</div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 shrink-0 mt-0.5">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Head Office</div>
                      <div className="text-muted-foreground leading-relaxed">
                        Bincoz Technologies<br />
                        Cyberpark Campus, Nellikode<br />
                        Kozhikode, Kerala 673016
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 shrink-0 mt-0.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Support Hours</div>
                      <div className="text-muted-foreground">
                        24/7 Priority Emergency Support for Active Events
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 bg-orange-50/60 dark:bg-orange-950/20 border-orange-200/80 dark:border-orange-900/40">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-600 w-fit mx-auto">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Message Received!
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Thank you for contacting Bincoz. Our team will review your message and get back to you within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "General Inquiry",
                          message: "",
                        });
                      }}
                      className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl mt-4"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      Send Us a Message
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Your Name *"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Kumar"
                        required
                      />

                      <Input
                        label="Email Address *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rahul@example.com"
                        required
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                      />

                      <div className="w-full">
                        <label className="mb-2 block text-sm font-medium text-foreground">
                          Subject Topic
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm text-foreground focus:border-orange-500 focus:outline-none"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Worker Support">Worker Support</option>
                          <option value="Employer / Business Partnership">Employer / Business Partnership</option>
                          <option value="Technical Issue">Technical Issue</option>
                        </select>
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="w-full rounded-md border border-border bg-white p-3 text-sm text-foreground placeholder:text-muted focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      loading={isSubmitting}
                      loadingText="Sending..."
                      fullWidth
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-base mt-2"
                      rightIcon={<Send className="h-4 w-4" />}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </main>

      <LandingFooter />
    </div>
  );
}
