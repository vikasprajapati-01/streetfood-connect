'use client'

import { useState } from 'react'
import { VendorDashboardLayout } from '@/components/vendor/layout'
import { 
  UserIcon, 
  ShieldCheckIcon, 
  BellIcon,
  CreditCardIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

export default function VendorSettings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    groupBuyAlerts: true,
    emailMarketing: false,
    smsNotifications: true,
  })
  const [profile, setProfile] = useState({
    businessName: 'Delhi Street Food Corner',
    ownerName: 'Rajesh Kumar',
    email: 'rajesh@streetfood.com',
    phone: '+91 98765 43210',
    address: 'Connaught Place, New Delhi',
    description: 'Authentic North Indian street food vendor serving delicious chaat and snacks.',
    gstNumber: '07AAACH7409R1ZZ',
    businessType: 'Food Stall',
  })
  const [saved, setSaved] = useState(false)

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon },
  ]

  const handleSave = () => {
    // Simulate saving data
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }))
  }

  return (
    <VendorDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your account settings and preferences.
          </p>
        </div>

        {saved && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Settings saved successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className={`-ml-0.5 mr-2 h-5 w-5 ${
                    activeTab === tab.id ? 'text-black' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Business Profile</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Update your business information and profile details.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="label">Business Name</label>
                    <input
                      type="text"
                      value={profile.businessName}
                      onChange={(e) => setProfile({...profile, businessName: e.target.value})}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">Owner Name</label>
                    <input
                      type="text"
                      value={profile.ownerName}
                      onChange={(e) => setProfile({...profile, ownerName: e.target.value})}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">Phone</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="input"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="label">Business Address</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">GST Number</label>
                    <input
                      type="text"
                      value={profile.gstNumber}
                      onChange={(e) => setProfile({...profile, gstNumber: e.target.value})}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">Business Type</label>
                    <select
                      value={profile.businessType}
                      onChange={(e) => setProfile({...profile, businessType: e.target.value})}
                      className="input"
                    >
                      <option value="Food Stall">Food Stall</option>
                      <option value="Food Truck">Food Truck</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Catering">Catering Service</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="label">Business Description</label>
                    <textarea
                      rows={3}
                      value={profile.description}
                      onChange={(e) => setProfile({...profile, description: e.target.value})}
                      className="input"
                      placeholder="Describe your business..."
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Manage your password and security preferences.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="label">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="input pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="label">New Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="label">Confirm New Password</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="pt-4">
                    <button className="btn btn-primary">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <button className="btn btn-outline">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Choose how you want to be notified about updates and activities.
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {key === 'orderUpdates' && 'Order Updates'}
                          {key === 'groupBuyAlerts' && 'Group Buy Alerts'}
                          {key === 'emailMarketing' && 'Marketing Emails'}
                          {key === 'smsNotifications' && 'SMS Notifications'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {key === 'orderUpdates' && 'Get notified about order status changes'}
                          {key === 'groupBuyAlerts' && 'Alerts for new group buying opportunities'}
                          {key === 'emailMarketing' && 'Receive promotional emails and newsletters'}
                          {key === 'smsNotifications' && 'Get important updates via SMS'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                          value ? 'bg-black' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            value ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Manage your payment methods and billing details.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Current Plan</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">Basic Plan</p>
                      <p className="text-sm text-gray-600">₹299/month</p>
                    </div>
                    <button className="btn btn-outline">
                      Upgrade Plan
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Payment Methods</h4>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                          <p className="text-xs text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-sm text-black hover:underline">Edit</button>
                        <button className="text-sm text-red-600 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 btn btn-outline">
                    Add Payment Method
                  </button>
                </div>
              </div>
            )}

            <div className="pt-6 border-t">
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VendorDashboardLayout>
  )
}
