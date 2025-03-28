
import { useState } from 'react';
import { Trash2, PlusCircle, Upload, Camera, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface GuestDetail {
  name: string;
  age: string;
  idType: string;
  idNumber: string;
  photoUploaded: boolean;
}

interface GuestDetailsFormProps {
  guestCount: number;
  onGuestDetailsChange: (details: GuestDetail[]) => void;
}

const GuestDetailsForm = ({ guestCount, onGuestDetailsChange }: GuestDetailsFormProps) => {
  const [guestDetails, setGuestDetails] = useState<GuestDetail[]>([
    { name: '', age: '', idType: 'passport', idNumber: '', photoUploaded: false }
  ]);
  const [emailInput, setEmailInput] = useState<{ [key: number]: string }>({});
  const [showEmailInput, setShowEmailInput] = useState<{ [key: number]: boolean }>({});
  const { toast } = useToast();

  const handleAddGuest = () => {
    if (guestDetails.length < guestCount) {
      const newGuestDetails = [...guestDetails, { name: '', age: '', idType: 'passport', idNumber: '', photoUploaded: false }];
      setGuestDetails(newGuestDetails);
      onGuestDetailsChange(newGuestDetails);
    }
  };

  const handleRemoveGuest = (index: number) => {
    if (guestDetails.length > 1) {
      const newGuestDetails = guestDetails.filter((_, i) => i !== index);
      setGuestDetails(newGuestDetails);
      onGuestDetailsChange(newGuestDetails);
    }
  };

  const handleGuestInputChange = (index: number, field: keyof GuestDetail, value: string) => {
    const newGuestDetails = [...guestDetails];
    newGuestDetails[index] = { ...newGuestDetails[index], [field]: value };
    setGuestDetails(newGuestDetails);
    onGuestDetailsChange(newGuestDetails);
  };

  const handlePhotoUpload = (index: number) => {
    // In a real app, this would handle the actual photo upload
    // For now, we'll just simulate a successful upload
    const newGuestDetails = [...guestDetails];
    newGuestDetails[index] = { ...newGuestDetails[index], photoUploaded: true };
    setGuestDetails(newGuestDetails);
    onGuestDetailsChange(newGuestDetails);
  };

  const handleSendEmailVerification = (index: number) => {
    const email = emailInput[index];
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send an email with a link to upload photo
    toast({
      title: "Verification Email Sent",
      description: `An email has been sent to ${email} with instructions to upload photo ID.`,
      variant: "default"
    });

    // For demo purposes, we'll simulate the email being sent and a photo being uploaded
    setTimeout(() => {
      const newGuestDetails = [...guestDetails];
      newGuestDetails[index] = { ...newGuestDetails[index], photoUploaded: true };
      setGuestDetails(newGuestDetails);
      onGuestDetailsChange(newGuestDetails);

      // Hide the email input once sent
      setShowEmailInput(prev => ({ ...prev, [index]: false }));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Guest Details</h3>
        {guestDetails.length < guestCount && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={handleAddGuest}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Add Guest
          </Button>
        )}
      </div>

      {guestDetails.map((guest, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Guest {index + 1}</h4>
            {guestDetails.length > 1 && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveGuest(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>Full Name</Label>
              <Input 
                id={`name-${index}`}
                value={guest.name}
                onChange={(e) => handleGuestInputChange(index, 'name', e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`age-${index}`}>Age</Label>
              <Input 
                id={`age-${index}`}
                type="number"
                value={guest.age}
                onChange={(e) => handleGuestInputChange(index, 'age', e.target.value)}
                placeholder="Enter age"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`idType-${index}`}>ID Type</Label>
              <select 
                id={`idType-${index}`}
                value={guest.idType}
                onChange={(e) => handleGuestInputChange(index, 'idType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500/50 focus:border-transparent transition-all"
                required
              >
                <option value="passport">Passport</option>
                <option value="driving">Driving License</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`idNumber-${index}`}>ID Number</Label>
              <Input 
                id={`idNumber-${index}`}
                value={guest.idNumber}
                onChange={(e) => handleGuestInputChange(index, 'idNumber', e.target.value)}
                placeholder="Enter ID number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Photo Verification</Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
              {guest.photoUploaded ? (
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Photo uploaded successfully</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handlePhotoUpload(index)}
                  >
                    Replace Photo
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-700 mb-4">Upload a photo for identity verification</p>
                  
                  {showEmailInput[index] ? (
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          value={emailInput[index] || ''}
                          onChange={(e) => setEmailInput(prev => ({ ...prev, [index]: e.target.value }))}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="default"
                          size="sm"
                          onClick={() => handleSendEmailVerification(index)}
                          className="whitespace-nowrap"
                        >
                          Send Link
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowEmailInput(prev => ({ ...prev, [index]: false }))}
                        className="text-gray-500"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handlePhotoUpload(index)}
                        className="flex items-center gap-1"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Photo
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handlePhotoUpload(index)}
                        className="flex items-center gap-1"
                      >
                        <Camera className="h-4 w-4" />
                        Take Photo
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowEmailInput(prev => ({ ...prev, [index]: true }))}
                        className="flex items-center gap-1"
                      >
                        <Mail className="h-4 w-4" />
                        Email Link
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {guestDetails.length < guestCount && (
        <p className="text-sm text-amber-600">
          Please add {guestCount - guestDetails.length} more {guestCount - guestDetails.length === 1 ? 'guest' : 'guests'} to continue.
        </p>
      )}
    </div>
  );
};

export default GuestDetailsForm;
