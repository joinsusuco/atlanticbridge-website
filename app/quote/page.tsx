"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useIsMaximized } from "@/hooks/useIsMaximized";
import ImageUpload from "@/components/ImageUpload";

interface UploadedFile {
  path: string;
  filename: string;
  size: number;
  token: string;
}

type ServiceType = "product-sourcing" | "bulk-purchasing" | "vehicle-procurement" | "vehicle-shipping" | "cargo-shipping" | null;

interface FormData {
  // Common fields
  serviceType: ServiceType;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  preferredContact: string;
  additionalNotes: string;

  // Product Sourcing
  productCategories: string[];
  productDetails: string;
  productBudget: string;
  productTimeline: string;

  // Bulk Purchasing
  businessType: string;
  bulkCategories: string[];
  bulkDetails: string;
  estimatedVolume: string;
  bulkFrequency: string;

  // Vehicle Procurement
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYearRange: string;
  vehicleMileage: string;
  vehicleBudget: string;
  vehicleCondition: string;

  // Vehicle Shipping
  hasVehicle: string;
  shippingVehicleInfo: string;
  vehicleLocation: string;
  shippingMethod: string;
  vehicleRunning: string;

  // Cargo Shipping
  cargoDescription: string;
  cargoPickupLocation: string;
  cargoEstimatedWeight: string;
  cargoDimensions: string;
  cargoDeliveryMethod: string;
}

const initialFormData: FormData = {
  serviceType: null,
  fullName: "",
  email: "",
  phone: "",
  country: "Gambia",
  preferredContact: "email",
  additionalNotes: "",

  productCategories: [],
  productDetails: "",
  productBudget: "",
  productTimeline: "",

  businessType: "",
  bulkCategories: [],
  bulkDetails: "",
  estimatedVolume: "",
  bulkFrequency: "",

  vehicleType: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYearRange: "",
  vehicleMileage: "",
  vehicleBudget: "",
  vehicleCondition: "",

  hasVehicle: "",
  shippingVehicleInfo: "",
  vehicleLocation: "",
  shippingMethod: "",
  vehicleRunning: "",

  cargoDescription: "",
  cargoPickupLocation: "",
  cargoEstimatedWeight: "",
  cargoDimensions: "",
  cargoDeliveryMethod: "",
};

const services = [
  {
    id: "product-sourcing" as ServiceType,
    title: "Product Sourcing",
    description: "Furniture, appliances, electronics, food staples, and household goods",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: "bulk-purchasing" as ServiceType,
    title: "Bulk Purchasing",
    description: "Food staples, retail stock, and wholesale supply",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    id: "vehicle-procurement" as ServiceType,
    title: "Vehicle Procurement",
    description: "Cars, trucks, SUVs, and heavy equipment",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zM3 9l2.5-5h9l4 5M3 9h18v5a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      </svg>
    ),
  },
  {
    id: "vehicle-shipping" as ServiceType,
    title: "Vehicle Shipping",
    description: "Ship vehicles you already own to The Gambia",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  {
    id: "cargo-shipping" as ServiceType,
    title: "Cargo Shipping",
    description: "Ship goods you already own to The Gambia",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

const productCategories = [
  "Furniture",
  "Appliances",
  "Electronics",
  "Household Goods",
  "Food Staples",
  "Business Equipment",
  "Building Materials",
  "Other",
];

const bulkCategories = [
  "Food Staples (Rice, Oil, Pasta)",
  "Personal Care Products",
  "Household Items",
  "Baby Products",
  "Cleaning Supplies",
  "Electronics",
  "Clothing & Apparel",
  "Other",
];

const vehicleTypes = [
  "Sedan",
  "SUV / Crossover",
  "Pickup Truck",
  "Van / Minivan",
  "Commercial Truck",
  "Heavy Equipment",
  "Motorcycle",
  "Other",
];

function QuotePageContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMaximized = useIsMaximized();

  // Check for service parameter in URL
  useEffect(() => {
    const service = searchParams.get("service");
    if (service && services.some((s) => s.id === service)) {
      setFormData((prev) => ({ ...prev, serviceType: service as ServiceType }));
      setStep(2);
    }
  }, [searchParams]);

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      updateFormData(field, currentArray.filter((item) => item !== value));
    } else {
      updateFormData(field, [...currentArray, value]);
    }
  };

  const selectService = (serviceId: ServiceType) => {
    setFormData((prev) => ({ ...prev, serviceType: serviceId }));
    setStep(2);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceType: formData.serviceType,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          preferredContact: formData.preferredContact,
          additionalNotes: formData.additionalNotes,
          // Service-specific fields based on service type
          ...(formData.serviceType === "product-sourcing" && {
            productCategories: formData.productCategories,
            productDetails: formData.productDetails,
            productBudget: formData.productBudget,
            productTimeline: formData.productTimeline,
          }),
          ...(formData.serviceType === "bulk-purchasing" && {
            businessType: formData.businessType,
            bulkCategories: formData.bulkCategories,
            bulkDetails: formData.bulkDetails,
            estimatedVolume: formData.estimatedVolume,
            bulkFrequency: formData.bulkFrequency,
          }),
          ...(formData.serviceType === "vehicle-procurement" && {
            vehicleType: formData.vehicleType,
            vehicleMake: formData.vehicleMake,
            vehicleModel: formData.vehicleModel,
            vehicleYearRange: formData.vehicleYearRange,
            vehicleMileage: formData.vehicleMileage,
            vehicleBudget: formData.vehicleBudget,
            vehicleCondition: formData.vehicleCondition,
          }),
          ...(formData.serviceType === "vehicle-shipping" && {
            hasVehicle: formData.hasVehicle,
            shippingVehicleInfo: formData.shippingVehicleInfo,
            vehicleLocation: formData.vehicleLocation,
            shippingMethod: formData.shippingMethod,
            vehicleRunning: formData.vehicleRunning,
          }),
          ...(formData.serviceType === "cargo-shipping" && {
            cargoDescription: formData.cargoDescription,
            cargoPickupLocation: formData.cargoPickupLocation,
            cargoEstimatedWeight: formData.cargoEstimatedWeight,
            cargoDimensions: formData.cargoDimensions,
            cargoDeliveryMethod: formData.cargoDeliveryMethod,
          }),
          // Uploaded images
          images: uploadedImages.map((img) => ({
            path: img.path,
            filename: img.filename,
            token: img.token,
          })),
          // Honeypot field (should be empty)
          website: "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote request");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Quote submission error:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTotalSteps = () => {
    return 3; // Service selection, service-specific details, contact info
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Select Service";
      case 2:
        return formData.serviceType
          ? services.find((s) => s.id === formData.serviceType)?.title + " Details"
          : "Service Details";
      case 3:
        return "Your Information";
      default:
        return "";
    }
  };

  if (isSubmitted) {
    return (
      <section className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gray-50">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy">Quote Request Submitted</h1>
            <p className="mt-4 text-gray-600 text-lg">
              Thank you for your request. We&apos;ve received your information and will review it promptly.
              Expect to hear from us within 1-2 business days.
            </p>
            <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200 text-left">
              <h3 className="font-bold text-navy mb-4">What happens next?</h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                  <span>We review your request and research options</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                  <span>We prepare a detailed quote with pricing and timeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                  <span>We contact you to discuss the quote and next steps</span>
                </li>
              </ol>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 text-base font-bold rounded-full bg-gold text-navy hover:bg-gold-light transition-all"
              >
                Return Home
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-6 py-3 text-base font-bold rounded-full border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-8 lg:pt-40 lg:pb-12 bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-cargo-ship-aerial.jpg')" }}
        />
        <div className="absolute inset-0 bg-navy/80" />

        <div className={`relative px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-gold-light font-bold tracking-wider uppercase text-sm">
              Request a Quote
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Get a Shipping Quote to Gambia
            </h1>
            <p className="mt-4 text-white/80 text-lg">
              Fill out the form below and we&apos;ll prepare a detailed quote for you.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 lg:py-16 bg-gray-50 min-h-[60vh]">
        <div className={`px-6 sm:px-8 lg:px-6 ${isMaximized ? "xl:px-[7.5%]" : "xl:px-8"}`}>
          <div className="max-w-3xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Step {step} of {getTotalSteps()}
                </span>
                <span className="text-sm font-medium text-navy">{getStepTitle()}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-300"
                  style={{ width: `${(step / getTotalSteps()) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  What service are you interested in?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => selectService(service.id)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg ${
                        formData.serviceType === service.id
                          ? "border-gold bg-gold/5"
                          : "border-gray-200 bg-white hover:border-gold/50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        formData.serviceType === service.id
                          ? "bg-gold text-navy"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-bold text-navy">{service.title}</h3>
                      <p className="mt-1 text-gray-600 text-sm">{service.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Service-Specific Details */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200">
                {/* Product Sourcing Form */}
                {formData.serviceType === "product-sourcing" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-navy">Product Sourcing Details</h2>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-3">
                        What categories are you interested in? *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {productCategories.map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => toggleArrayField("productCategories", category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              formData.productCategories.includes(category)
                                ? "bg-gold text-navy"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Describe what you need *
                      </label>
                      <textarea
                        value={formData.productDetails}
                        onChange={(e) => updateFormData("productDetails", e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="List specific products, brands, models, quantities, or any requirements..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Estimated Budget (USD)
                        </label>
                        <select
                          value={formData.productBudget}
                          onChange={(e) => updateFormData("productBudget", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        >
                          <option value="">Select range</option>
                          <option value="under-1000">Under $1,000</option>
                          <option value="1000-5000">$1,000 - $5,000</option>
                          <option value="5000-10000">$5,000 - $10,000</option>
                          <option value="10000-25000">$10,000 - $25,000</option>
                          <option value="25000-plus">$25,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Timeline
                        </label>
                        <select
                          value={formData.productTimeline}
                          onChange={(e) => updateFormData("productTimeline", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        >
                          <option value="">Select timeline</option>
                          <option value="urgent">Urgent (ASAP)</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="2-3-months">2-3 months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    <ImageUpload onFilesChange={setUploadedImages} />
                  </div>
                )}

                {/* Bulk Purchasing Form */}
                {formData.serviceType === "bulk-purchasing" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-navy">Bulk Purchasing Details</h2>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        What type of business are you? *
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => updateFormData("businessType", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      >
                        <option value="">Select business type</option>
                        <option value="mini-market">Mini Market / Corner Shop</option>
                        <option value="restaurant">Restaurant / Food Service</option>
                        <option value="reseller">Reseller / Distributor</option>
                        <option value="commercial">Commercial / Industrial</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-3">
                        Product categories of interest *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {bulkCategories.map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => toggleArrayField("bulkCategories", category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium text-left transition-all ${
                              formData.bulkCategories.includes(category)
                                ? "bg-gold text-navy"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Describe your product needs *
                      </label>
                      <textarea
                        value={formData.bulkDetails}
                        onChange={(e) => updateFormData("bulkDetails", e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="List specific products, brands, quantities, or attach a product list..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Estimated Volume
                        </label>
                        <select
                          value={formData.estimatedVolume}
                          onChange={(e) => updateFormData("estimatedVolume", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        >
                          <option value="">Select volume</option>
                          <option value="small">Small (LCL)</option>
                          <option value="20ft">20ft Container</option>
                          <option value="40ft">40ft Container</option>
                          <option value="multiple">Multiple Containers</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Order Frequency
                        </label>
                        <select
                          value={formData.bulkFrequency}
                          onChange={(e) => updateFormData("bulkFrequency", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        >
                          <option value="">Select frequency</option>
                          <option value="one-time">One-time order</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="as-needed">As needed</option>
                        </select>
                      </div>
                    </div>

                    <ImageUpload onFilesChange={setUploadedImages} />
                  </div>
                )}

                {/* Vehicle Procurement Form */}
                {formData.serviceType === "vehicle-procurement" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-navy">Vehicle Procurement Details</h2>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Vehicle Type *
                      </label>
                      <select
                        value={formData.vehicleType}
                        onChange={(e) => updateFormData("vehicleType", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      >
                        <option value="">Select type</option>
                        {vehicleTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Preferred Make
                        </label>
                        <input
                          type="text"
                          value={formData.vehicleMake}
                          onChange={(e) => updateFormData("vehicleMake", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                          placeholder="e.g., Toyota, Ford"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Preferred Model
                        </label>
                        <input
                          type="text"
                          value={formData.vehicleModel}
                          onChange={(e) => updateFormData("vehicleModel", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                          placeholder="e.g., Camry, F-150"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Year Range
                        </label>
                        <input
                          type="text"
                          value={formData.vehicleYearRange}
                          onChange={(e) => updateFormData("vehicleYearRange", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                          placeholder="e.g., 2018-2022"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Max Mileage
                        </label>
                        <select
                          value={formData.vehicleMileage}
                          onChange={(e) => updateFormData("vehicleMileage", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        >
                          <option value="">Select mileage</option>
                          <option value="under-50k">Under 50,000 mi</option>
                          <option value="50k-100k">50,000 - 100,000 mi</option>
                          <option value="100k-150k">100,000 - 150,000 mi</option>
                          <option value="any">Any mileage</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Budget (USD)
                        </label>
                        <select
                          value={formData.vehicleBudget}
                          onChange={(e) => updateFormData("vehicleBudget", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        >
                          <option value="">Select budget</option>
                          <option value="under-10k">Under $10,000</option>
                          <option value="10k-20k">$10,000 - $20,000</option>
                          <option value="20k-35k">$20,000 - $35,000</option>
                          <option value="35k-50k">$35,000 - $50,000</option>
                          <option value="50k-plus">$50,000+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Condition
                        </label>
                        <select
                          value={formData.vehicleCondition}
                          onChange={(e) => updateFormData("vehicleCondition", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        >
                          <option value="">Select condition</option>
                          <option value="new">New</option>
                          <option value="certified-preowned">Certified Pre-Owned</option>
                          <option value="used-excellent">Used - Excellent</option>
                          <option value="used-good">Used - Good</option>
                        </select>
                      </div>
                    </div>

                    <ImageUpload onFilesChange={setUploadedImages} />
                  </div>
                )}

                {/* Vehicle Shipping Form */}
                {formData.serviceType === "vehicle-shipping" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-navy">Vehicle Shipping Details</h2>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Do you already have a vehicle to ship? *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => updateFormData("hasVehicle", "yes")}
                          className={`px-4 py-3 rounded-xl font-medium transition-all ${
                            formData.hasVehicle === "yes"
                              ? "bg-gold text-navy"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          Yes, I have a vehicle
                        </button>
                        <button
                          type="button"
                          onClick={() => updateFormData("hasVehicle", "no")}
                          className={`px-4 py-3 rounded-xl font-medium transition-all ${
                            formData.hasVehicle === "no"
                              ? "bg-gold text-navy"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          No, I need to find one
                        </button>
                      </div>
                      {formData.hasVehicle === "no" && (
                        <p className="mt-3 text-sm text-gray-500">
                          Consider our{" "}
                          <Link href="/quote?service=vehicle-procurement" className="text-gold-dark font-semibold">
                            Vehicle Procurement
                          </Link>{" "}
                          service to help you find a vehicle first.
                        </p>
                      )}
                    </div>

                    {formData.hasVehicle === "yes" && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-navy mb-2">
                            Vehicle Information *
                          </label>
                          <textarea
                            value={formData.shippingVehicleInfo}
                            onChange={(e) => updateFormData("shippingVehicleInfo", e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                            placeholder="Year, Make, Model, VIN (if available)..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-navy mb-2">
                            Current Location *
                          </label>
                          <input
                            type="text"
                            value={formData.vehicleLocation}
                            onChange={(e) => updateFormData("vehicleLocation", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                            placeholder="City, State (e.g., Houston, TX)"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-navy mb-2">
                              Shipping Method
                            </label>
                            <select
                              value={formData.shippingMethod}
                              onChange={(e) => updateFormData("shippingMethod", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                            >
                              <option value="">Select method</option>
                              <option value="roro">RoRo (Roll-on/Roll-off)</option>
                              <option value="container">Container</option>
                              <option value="recommend">Recommend for me</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-navy mb-2">
                              Is the vehicle running?
                            </label>
                            <select
                              value={formData.vehicleRunning}
                              onChange={(e) => updateFormData("vehicleRunning", e.target.value)}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                            >
                              <option value="">Select</option>
                              <option value="yes">Yes, runs fine</option>
                              <option value="no">No, not running</option>
                            </select>
                          </div>
                        </div>

                        <ImageUpload onFilesChange={setUploadedImages} />
                      </>
                    )}
                  </div>
                )}

                {/* Cargo Shipping Form */}
                {formData.serviceType === "cargo-shipping" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-navy">Cargo Shipping Details</h2>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        What are you shipping? *
                      </label>
                      <textarea
                        value={formData.cargoDescription}
                        onChange={(e) => updateFormData("cargoDescription", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="Describe the items you need shipped (e.g., furniture, appliances, equipment...)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        How will you get the goods to us? *
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => updateFormData("cargoDeliveryMethod", "pickup")}
                          className={`px-4 py-3 rounded-xl font-medium transition-all ${
                            formData.cargoDeliveryMethod === "pickup"
                              ? "bg-gold text-navy"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          Pickup from my location
                        </button>
                        <button
                          type="button"
                          onClick={() => updateFormData("cargoDeliveryMethod", "dropoff")}
                          className={`px-4 py-3 rounded-xl font-medium transition-all ${
                            formData.cargoDeliveryMethod === "dropoff"
                              ? "bg-gold text-navy"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          I&apos;ll drop off
                        </button>
                      </div>
                    </div>

                    {formData.cargoDeliveryMethod === "pickup" && (
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Pickup Address *
                        </label>
                        <input
                          type="text"
                          value={formData.cargoPickupLocation}
                          onChange={(e) => updateFormData("cargoPickupLocation", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                          placeholder="Full address where we should pick up the goods"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Estimated Weight
                        </label>
                        <select
                          value={formData.cargoEstimatedWeight}
                          onChange={(e) => updateFormData("cargoEstimatedWeight", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        >
                          <option value="">Select weight range</option>
                          <option value="under-100">Under 100 lbs</option>
                          <option value="100-500">100 - 500 lbs</option>
                          <option value="500-1000">500 - 1,000 lbs</option>
                          <option value="1000-5000">1,000 - 5,000 lbs</option>
                          <option value="over-5000">Over 5,000 lbs</option>
                          <option value="not-sure">Not sure</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-navy mb-2">
                          Approximate Dimensions
                        </label>
                        <input
                          type="text"
                          value={formData.cargoDimensions}
                          onChange={(e) => updateFormData("cargoDimensions", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                          placeholder="e.g., 4ft x 3ft x 2ft or 'pallet-sized'"
                        />
                      </div>
                    </div>

                    <ImageUpload onFilesChange={setUploadedImages} />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-full border-2 border-gray-300 text-gray-600 hover:border-gray-400 transition-all"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-6 py-3 text-base font-bold rounded-full bg-gold text-navy hover:bg-gold-light transition-all"
                  >
                    Continue
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-200">
                <h2 className="text-xl font-bold text-navy mb-6">Your Information</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateFormData("fullName", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="+220 ..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">
                        Country
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => updateFormData("country", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      >
                        <option value="Gambia">The Gambia</option>
                        <option value="USA">United States</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-4">
                      {["email", "phone", "whatsapp"].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => updateFormData("preferredContact", method)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                            formData.preferredContact === method
                              ? "bg-gold text-navy"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) => updateFormData("additionalNotes", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      placeholder="Any other information or questions..."
                    />
                  </div>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm">{submitError}</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-full border-2 border-gray-300 text-gray-600 hover:border-gray-400 transition-all"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-3 text-base font-bold rounded-full bg-gold text-navy hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full" />
      </div>
    }>
      <QuotePageContent />
    </Suspense>
  );
}
