
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Award, Video, Music, Check, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MembershipPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoinPlus = () => {
    toast({
      title: "SnapShop Plus",
      description: "You're being redirected to the checkout page for SnapShop Plus.",
    });
    navigate("/checkout?plan=snapshop-plus");
  };

  const handleJoinPrime = () => {
    toast({
      title: "SnapPrime",
      description: "You're being redirected to the checkout page for SnapPrime.",
    });
    navigate("/checkout?plan=snap-prime");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Premium Memberships</h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Join our premium programs and enjoy exclusive benefits tailored for our valued customers.
        </p>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left border">Features</th>
                <th className="p-4 text-center border bg-purple-50">SnapShop Plus</th>
                <th className="p-4 text-center border bg-blue-50">SnapPrime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border">Exclusive Discounts</td>
                <td className="p-4 border text-center text-purple-600"><Check className="inline h-5 w-5" /></td>
                <td className="p-4 border text-center text-blue-600"><Check className="inline h-5 w-5" /></td>
              </tr>
              <tr>
                <td className="p-4 border">Priority Customer Service</td>
                <td className="p-4 border text-center text-purple-600"><Check className="inline h-5 w-5" /></td>
                <td className="p-4 border text-center text-blue-600"><Check className="inline h-5 w-5" /></td>
              </tr>
              <tr>
                <td className="p-4 border">Early Access to Sales</td>
                <td className="p-4 border text-center text-purple-600"><Check className="inline h-5 w-5" /></td>
                <td className="p-4 border text-center">-</td>
              </tr>
              <tr>
                <td className="p-4 border">Free Next-Day Delivery</td>
                <td className="p-4 border text-center text-purple-600"><Check className="inline h-5 w-5" /></td>
                <td className="p-4 border text-center text-blue-600"><Check className="inline h-5 w-5" /></td>
              </tr>
              <tr>
                <td className="p-4 border">Unlimited Video Streaming</td>
                <td className="p-4 border text-center">-</td>
                <td className="p-4 border text-center text-blue-600"><Check className="inline h-5 w-5" /></td>
              </tr>
              <tr>
                <td className="p-4 border">Ad-free Music Streaming</td>
                <td className="p-4 border text-center">-</td>
                <td className="p-4 border text-center text-blue-600"><Check className="inline h-5 w-5" /></td>
              </tr>
              <tr>
                <td className="p-4 border">Member-Only Deals</td>
                <td className="p-4 border text-center text-purple-600"><Check className="inline h-5 w-5" /></td>
                <td className="p-4 border text-center text-blue-600"><Check className="inline h-5 w-5" /></td>
              </tr>
              <tr>
                <td className="p-4 border font-medium">Monthly Price</td>
                <td className="p-4 border text-center font-bold text-purple-700">₹299/month</td>
                <td className="p-4 border text-center font-bold text-blue-700">₹499/month</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Membership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* SnapShop Plus Card */}
          <div className="border rounded-xl p-6 shadow-sm bg-gradient-to-br from-purple-50 to-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700">SnapShop Plus</h2>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="bg-purple-100 p-1 rounded-full mr-2 text-purple-600">✓</span>
                Exclusive discounts on all products
              </li>
              <li className="flex items-center text-gray-700">
                <span className="bg-purple-100 p-1 rounded-full mr-2 text-purple-600">✓</span>
                Priority customer service
              </li>
              <li className="flex items-center text-gray-700">
                <span className="bg-purple-100 p-1 rounded-full mr-2 text-purple-600">✓</span>
                Early access to sales events
              </li>
              <li className="flex items-center text-gray-700">
                <span className="bg-purple-100 p-1 rounded-full mr-2 text-purple-600">✓</span>
                Free next-day delivery on orders
              </li>
            </ul>
            
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Monthly subscription</div>
              <div className="text-3xl font-bold text-purple-700">₹299/month</div>
              <div className="text-sm text-gray-500 mt-1">Cancel anytime</div>
            </div>
            
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700"
              onClick={handleJoinPlus}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> 
              Join SnapShop Plus
            </Button>
          </div>
          
          {/* SnapPrime Card */}
          <div className="border rounded-xl p-6 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-700">SnapPrime</h2>
              <div className="flex gap-2">
                <Video className="h-6 w-6 text-blue-600" />
                <Music className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="bg-blue-100 p-1 rounded-full mr-2 text-blue-600">✓</span>
                Free express shipping on all orders
              </li>
              <li className="flex items-center text-gray-700">
                <span className="bg-blue-100 p-1 rounded-full mr-2 text-blue-600">✓</span>
                Unlimited streaming of movies and shows
              </li>
              <li className="flex items-center text-gray-700">
                <span className="bg-blue-100 p-1 rounded-full mr-2 text-blue-600">✓</span>
                Ad-free music streaming service
              </li>
              <li className="flex items-center text-gray-700">
                <span className="bg-blue-100 p-1 rounded-full mr-2 text-blue-600">✓</span>
                Exclusive member-only deals
              </li>
            </ul>
            
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-1">Monthly subscription</div>
              <div className="text-3xl font-bold text-blue-700">₹499/month</div>
              <div className="text-sm text-gray-500 mt-1">7-day free trial</div>
            </div>
            
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleJoinPrime}
            >
              Try SnapPrime Free
            </Button>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Can I switch between plans?</h3>
              <p className="text-gray-600">Yes, you can upgrade, downgrade, or cancel your membership at any time without any penalty.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">How does the free trial work?</h3>
              <p className="text-gray-600">SnapPrime offers a 7-day free trial. You won't be charged until the trial period ends, and you can cancel anytime before that.</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Are there any commitments?</h3>
              <p className="text-gray-600">No long-term commitments. All our memberships are monthly subscriptions that you can cancel at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MembershipPage;
