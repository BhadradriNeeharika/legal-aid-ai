import React, { useState } from 'react';
import { useGetLegalClinics, getGetLegalClinicsQueryKey } from '@workspace/api-client-react';
import { MapPin, Search, Navigation, Building2, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Layout } from '@/components/layout';
import { Input } from '@/components/ui/input';

export default function ClinicsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: clinics = [], isLoading } = useGetLegalClinics({
    query: { queryKey: getGetLegalClinicsQueryKey() }
  });

  const filteredClinics = clinics.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-primary" />
            Free Legal Clinics
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            State Legal Services Authorities and independent clinics that offer free legal counsel, representation, and advice to women and marginalized groups.
          </p>
        </div>

        <div className="mb-8 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by clinic name or city..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-11 bg-card border-border"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredClinics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredClinics.map((clinic) => (
              <Card key={clinic.id} className="flex flex-col h-full border-border hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                  <div className="p-2.5 bg-primary/10 rounded-lg text-primary shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-foreground leading-snug">{clinic.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{clinic.location}</span>
                    </div>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                      <span className="font-medium text-foreground">{clinic.contact}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 px-6">
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(clinic.name + ' ' + clinic.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md transition-colors w-full justify-center"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-foreground mb-2">No clinics found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}