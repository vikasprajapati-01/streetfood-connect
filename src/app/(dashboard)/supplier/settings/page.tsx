'use client'

import { useState } from 'react'
import { SupplierDashboardLayout } from '@/components/supplier/layout'
import { 
  ShieldCheckIcon, 
  BellIcon,
  CreditCardIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'

export default function SupplierSettings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    orderRequests: true,
    groupBuyInvites: true,
    emailMarketing: false,
    smsNotifications: true,
    paymentAlerts: true,
  })
  const [profile, setProfile] = useState({
    companyName: 'Fresh Ingredients Pvt Ltd',
    contactPerson: 'Amit Sharma',
    email: 'amit@freshingredients.com',
    phone: '+91 98765 43210',
    address: 'Industrial Area, Gurgaon, Haryana',
    description: 'Premium quality vegetables, spices, and food ingredients supplier for restaurants and street food vendors.',
    gstNumber: '06AAACF1234R1ZZ',
    businessType: 'Wholesale Supplier',
    establishedYear: '2015',
    employeeCount: '50-100',
  })
  const [saved, setSaved] = useState(false)

  const tabs = [
    { id: 'profile', name: 'Company Profile', icon: BuildingOfficeIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'billing', name: 'Billing', icon: CreditCardIcon },
  ]

  const handleSave = () => {
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
    <SupplierDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your supplier account settings and preferences.
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
                  <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Update your company details and business information.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="label">Company Name</label>
                    <input
                      type="text"
                      value={profile.companyName}
                      onChange={(e) => setProfile({...profile, companyName: e.target.value})}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">Contact Person</label>
                    <input
                      type="text"
                      value={profile.contactPerson}
                      onChange={(e) => setProfile({...profile, contactPerson: e.target.value})}
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
                      <option value="Wholesale Supplier">Wholesale Supplier</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Manufacturer">Manufacturer</option>
                      <option value="Importer">Importer</option>
                    </select>
                  </div>

                  <div>
                    <label className="label">Established Year</label>
                    <input
                      type="text"
                      value={profile.establishedYear}
                      onChange={(e) => setProfile({...profile, establishedYear: e.target.value})}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="label">Employee Count</label>
                    <select
                      value={profile.employeeCount}
                      onChange={(e) => setProfile({...profile, employeeCount: e.target.value})}
                      className="input"
                    >
                      <option value="1-10">1-10</option>
                      <option value="11-25">11-25</option>
                      <option value="26-50">26-50</option>
                      <option value="50-100">50-100</option>
                      <option value="100+">100+</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="label">Company Description</label>
                    <textarea
                      rows={3}
                      value={profile.description}
                      onChange={(e) => setProfile({...profile, description: e.target.value})}
                      className="input"
                      placeholder="Describe your company and products..."
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
                    Choose how you want to be notified about business activities.
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {key === 'orderRequests' && 'Order Requests'}
                          {key === 'groupBuyInvites' && 'Group Buy Invitations'}
                          {key === 'emailMarketing' && 'Marketing Emails'}
                          {key === 'smsNotifications' && 'SMS Notifications'}
                          {key === 'paymentAlerts' && 'Payment Alerts'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {key === 'orderRequests' && 'Get notified when vendors place orders'}
                          {key === 'groupBuyInvites' && 'Alerts for group buying opportunities'}
                          {key === 'emailMarketing' && 'Receive promotional emails and newsletters'}
                          {key === 'smsNotifications' && 'Get important updates via SMS'}
                          {key === 'paymentAlerts' && 'Notifications about payments and invoices'}
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
                      <p className="text-lg font-semibold">Professional Plan</p>
                      <p className="text-sm text-gray-600">₹999/month</p>
                    </div>
                    <button className="btn btn-outline">
                      Upgrade Plan
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Bank Details</h4>
                  <div className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="label">Bank Name</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="HDFC Bank"
                        />
                      </div>
                      <div>
                        <label className="label">Account Number</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="1234567890"
                        />
                      </div>
                      <div>
                        <label className="label">IFSC Code</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="HDFC0001234"
                        />
                      </div>
                      <div>
                        <label className="label">Account Holder Name</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="Fresh Ingredients Pvt Ltd"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 border-t">
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="btn btn-primary"
                >\
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SupplierDashboardLayout>
  )
}
