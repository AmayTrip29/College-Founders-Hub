"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from 'react';
import { auth } from "@/lib/firebase";
import { updateEmail, updatePassword, updateProfile, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import type { User } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [user, setUser] = React.useState<User | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);
  
  // Profile state
  const [displayName, setDisplayName] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [startupName, setStartupName] = React.useState('');
  const [startupWebsite, setStartupWebsite] = React.useState('');
  const [startupDescription, setStartupDescription] = React.useState('');
  const [skills, setSkills] = React.useState('');
  const [linkedin, setLinkedin] = React.useState('');

  // Account state
  const [email, setEmail] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setDisplayName(currentUser.displayName ?? '');
        setEmail(currentUser.email ?? '');
        // In a real app, you'd fetch other profile data from a database
        setTitle('Founder');
        setBio('Passionate about building the future of tech.');
        setStartupName('Innovate Inc.');
        setStartupWebsite('https://innovate.com');
        setStartupDescription('AI-powered solutions for modern businesses.');
        setSkills('React, Next.js, Firebase, GenAI');
        setLinkedin('https://linkedin.com/in/username');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleProfileSave = async () => {
    if (!user) return;
    setIsSaving(true);
    
    try {
      await updateProfile(user, { displayName });
       // In a real app, you would also save the other fields (title, bio, etc.) to your database (e.g., Firestore).
      toast({ title: "Profile Updated", description: "Your public profile has been saved." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleAccountSave = async () => {
      if (!user || !user.email) return;
      setIsSaving(true);

      try {
        // Handle password change
        if (newPassword && currentPassword) {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            toast({ title: "Password Updated", description: "Your password has been changed successfully." });
            setCurrentPassword('');
            setNewPassword('');
        }
      } catch (error: any) {
          toast({ title: "Authentication Error", description: "Failed to update settings. Please check your current password.", variant: "destructive" });
      } finally {
          setIsSaving(false);
      }
  };

  const handlePhotoUpload = () => {
    toast({
        title: "Feature not available",
        description: "Photo uploads would be managed here in a full application."
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and account settings.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Public Profile</CardTitle>
                <CardDescription>
                    This is how others will see you on the site.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user?.photoURL ?? `https://placehold.co/80x80.png`} />
                            <AvatarFallback>{user?.displayName?.[0].toUpperCase() ?? 'U'}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" onClick={handlePhotoUpload}>
                            <Upload className="mr-2 h-4 w-4" />
                            Change Photo
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="title">Title / Role</Label>
                        <Input id="title" placeholder="e.g. Founder, Full-Stack Developer" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" placeholder="Tell us a little about yourself" value={bio} onChange={e => setBio(e.target.value)} />
                    </div>
                    
                    <Separator />

                    <div>
                        <h3 className="text-lg font-medium font-headline">Your Startup</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                           Provide information about your current venture.
                        </p>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="startupName">Startup Name</Label>
                                <Input id="startupName" placeholder="e.g. Innovate Inc." value={startupName} onChange={e => setStartupName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="startupWebsite">Startup Website</Label>
                                <Input id="startupWebsite" placeholder="https://innovate.com" value={startupWebsite} onChange={e => setStartupWebsite(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="startupDescription">Startup Description</Label>
                                <Textarea id="startupDescription" placeholder="What does your startup do?" value={startupDescription} onChange={e => setStartupDescription(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <Label htmlFor="skills">Skills</Label>
                        <Input id="skills" placeholder="e.g. React, Python, Marketing" value={skills} onChange={e => setSkills(e.target.value)}/>
                        <p className="text-sm text-muted-foreground">
                            Comma-separated values.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn URL</Label>
                        <Input id="linkedin" placeholder="https://linkedin.com/in/..." value={linkedin} onChange={e => setLinkedin(e.target.value)} />
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleProfileSave} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="account">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Account</CardTitle>
                <CardDescription>
                    Manage your account settings.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} disabled />
                        <p className="text-sm text-muted-foreground">Email address cannot be changed.</p>
                    </div>
                     <Separator />
                    <div>
                        <h3 className="text-lg font-medium font-headline">Password</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            To change your password, please enter your current password and a new password.
                        </p>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                     <div className="flex justify-end">
                        <Button onClick={handleAccountSave} disabled={isSaving || (!newPassword || !currentPassword)}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
