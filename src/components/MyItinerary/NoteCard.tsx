import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const NoteCard: React.FC = () => {
    return (
        <div className="border border-border-color rounded-lg bg-white">
            <div className="h-[52px] flex items-center justify-between px-4 border-b border-border-color">
                <h3 className="font-raleway text-xl font-semibold text-text-secondary">Note</h3>
            </div>
            <div className="p-4">
                <div className="border border-border-color rounded-lg overflow-hidden bg-base-background">
                    <div className="bg-primary text-white flex items-center justify-between px-4 py-3 rounded-t-lg">
                        <span className="font-raleway font-medium text-lg">Sightseeing</span>
                        <MoreHorizontal className="w-6 h-6 cursor-pointer" />
                    </div>
                    <div className="p-4 pt-5">
                        <h4 className="font-inter font-semibold text-xs text-text-primary mb-2.5">How to Reuse This Itinerary</h4>
                        <ul className="list-disc pl-5 font-inter text-xs text-text-primary/80 font-light tracking-wider space-y-2.5">
                            <li>Use this itinerary as a template for planning your own trip.</li>
                            <li>Update destinations based on your travel goals.</li>
                            <li>Adjust the travel dates to match your schedule.</li>
                            <li>Customize activities for each day (sightseeing, leisure, meals, etc.).</li>
                            <li>Edit accommodations to reflect your hotel or stay preferences.</li>
                            <li>Helps you stay organized and plan each day efficiently.</li>
                        </ul>
                        <div className="pt-8">
                            <hr className="border-t-2 border-dashed border-text-secondary/50" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;