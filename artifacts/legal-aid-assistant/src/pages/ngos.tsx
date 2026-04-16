import React, { useState } from 'react';
import { useGetNgos, getGetNgosQueryKey } from '@workspace/api-client-react';
import { HeartHandshake, Search, Mail, Phone, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Layout } from '@/components/layout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function NgosPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: ngos = [], isLoading } = useGetNgos({
    query: { queryKey: getGetNgosQueryKey() }
  });

  const filteredNgos = ngos.filter(n => 
    n.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <HeartHandshake className="w-8 h-8 text-primary" />
            Support NGOs
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Trusted Non-Governmental Organizations offering counseling, shelter, legal representation, and emotional support to women in distress.
          </p>
        </div>

        <div className="mb-8 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search organizations or services..." 
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
        ) : filteredNgos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNgos.map((ngo) => (
              <Card key={ngo.id} className="flex flex-col h-full hover:border-primary/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{ngo.name}</CardTitle>
                  <CardDescription className="text-sm font-medium mt-1">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10">
                      {ngo.service}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-3 mt-2">
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Phone className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium">{ngo.contact}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 px-6">
                  <a href={`tel:${ngo.contact.split(',')[0].replace(/\D/g,'')}`} className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
                    Call primary number <ExternalLink className="w-3 h-3" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
            <HeartHandshake className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-foreground mb-2">No organizations found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}