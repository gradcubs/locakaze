
import React from 'react';
import Header from '../components/Header';
import ApplyForm from '../components/ApplyForm';
import InfoCard from '../components/InfoCard';
import ProcessingAnimation from '../components/ProcessingAnimation';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-6 animate-fade-in">
            Fast Approval Process
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold mb-6 animate-slide-down">
            Get Your Line of Credit <span className="text-primary">Instantly</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-down" style={{ animationDelay: '100ms' }}>
            Apply for your personal line of credit today. Get approved in minutes with our
            streamlined application process and competitive rates.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-down" style={{ animationDelay: '200ms' }}>
            <button className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all transform hover:scale-[1.03] active:scale-[0.98] duration-200 shadow-sm">
              Check My Rate
            </button>
            <button className="px-6 py-3 bg-secondary text-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors">
              Learn More
            </button>
          </div>
          
          {/* Processing Animation */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <ProcessingAnimation />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="p-6 bg-white dark:bg-card rounded-2xl shadow-sm border border-border/50">
              <p className="text-3xl font-semibold text-primary mb-1">97%</p>
              <p className="text-muted-foreground text-sm">Application Approval Rate</p>
            </div>
            <div className="p-6 bg-white dark:bg-card rounded-2xl shadow-sm border border-border/50">
              <p className="text-3xl font-semibold text-primary mb-1">3 min</p>
              <p className="text-muted-foreground text-sm">Average Application Time</p>
            </div>
            <div className="p-6 bg-white dark:bg-card rounded-2xl shadow-sm border border-border/50">
              <p className="text-3xl font-semibold text-primary mb-1">7.99%</p>
              <p className="text-muted-foreground text-sm">Starting APR</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Why Choose Our Line of Credit</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible access to funds when you need them with competitive rates and transparent terms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              title="Competitive Rates"
              description="Our lines of credit feature some of the lowest rates in the industry, starting at just 7.99% APR for qualified applicants."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              }
            />
            <InfoCard
              title="Flexible Access"
              description="Draw funds as needed, pay back what you use, and access your available credit again without reapplying."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              }
            />
            <InfoCard
              title="Fast Approval"
              description="Get an instant decision on your application in minutes, not days, with funds available as soon as the same day."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              }
            />
          </div>
        </div>
      </section>
      
      {/* Application Form Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Apply for Your Line of Credit</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete your application in just a few minutes. Get an instant decision and access your funds quickly.
            </p>
          </div>
          
          <ApplyForm />
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-6 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our line of credit products.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-medium mb-2">How much can I borrow?</h3>
                <p className="text-muted-foreground">
                  Credit lines range from $1,000 to $50,000 based on your credit history, income, and other factors. You can check your pre-qualified amount without affecting your credit score.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-medium mb-2">What's the difference between a line of credit and a loan?</h3>
                <p className="text-muted-foreground">
                  A line of credit allows you to borrow up to a certain limit and pay interest only on what you use, while a loan provides a lump sum upfront that you repay over a fixed term.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-medium mb-2">How quickly can I access funds?</h3>
                <p className="text-muted-foreground">
                  After approval, funds can be available in your linked bank account as soon as the same business day or within 1-2 business days, depending on your bank's processing times.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-5">
                <h3 className="text-lg font-medium mb-2">Are there any fees?</h3>
                <p className="text-muted-foreground">
                  We pride ourselves on transparency. There are no application fees or annual fees. The only cost is the interest on the amount you borrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-1 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">L</span>
                </div>
                <span className="text-xl font-semibold text-primary">CreditLine</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Fast, flexible financing solutions designed for your needs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase text-foreground mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Line of Credit</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Personal Loans</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Business Financing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Credit Cards</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold uppercase text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} CreditLine. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
