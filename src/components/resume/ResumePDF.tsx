import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { PersonalizedData, RecruiterContext } from '@/components/portfolio/PortfolioProvider';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 11,
        color: '#333',
        lineHeight: 1.5,
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 4,
        color: '#000',
    },
    title: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    contactInfo: {
        fontSize: 10,
        color: '#666',
        flexDirection: 'row',
        gap: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
        color: '#000',
        marginTop: 15,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    section: {
        marginBottom: 10,
    },
    projectTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 12,
        color: '#000',
    },
    projectSubtitle: {
        fontSize: 10,
        color: '#666',
        marginBottom: 4,
    },
    projectDesc: {
        marginBottom: 6,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 3,
        paddingLeft: 10,
    },
    bullet: {
        width: 10,
        fontSize: 10,
    },
    bulletText: {
        flex: 1,
    },
    skillsText: {
        marginBottom: 4,
    },
    highlightBox: {
        backgroundColor: '#f8f9fa',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 4,
        borderLeftWidth: 3,
        borderLeftColor: '#4f46e5',
    },
    highlightTitle: {
        fontFamily: 'Helvetica-Bold',
        marginBottom: 4,
        color: '#4f46e5',
    },
});

interface ResumePDFProps {
    data: PersonalizedData;
    context: RecruiterContext | null;
}

export const ResumePDF = ({ data, context }: ResumePDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header section */}
            <View style={styles.header}>
                <Text style={styles.name}>{data.profile.name}</Text>
                <Text style={styles.title}>{data.profile.title}</Text>
                <View style={styles.contactInfo}>
                    <Text>{data.profile.email}</Text>
                    <Text>•</Text>
                    <Text>{data.profile.location}</Text>
                    {data.profile.links.github && (
                        <>
                            <Text>•</Text>
                            <Text>{data.profile.links.github.replace('https://', '')}</Text>
                        </>
                    )}
                    {data.profile.links.linkedin && (
                        <>
                            <Text>•</Text>
                            <Text>{data.profile.links.linkedin.replace('https://', '')}</Text>
                        </>
                    )}
                </View>
            </View>

            {/* Bio / Summary */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text>{data.profile.bio}</Text>
            </View>

            {/* Why Me (AI Generated) */}
            {context && data.whyMe && (
                <View style={styles.highlightBox}>
                    <Text style={styles.highlightTitle}>Why I'm a Great Fit for {context.company}</Text>
                    {data.whyMe.points.map((point, index) => (
                        <View key={index} style={styles.bulletPoint}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bulletText}>{point}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {data.experience.map((exp, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                            <Text style={styles.projectTitle}>{exp.role} at {exp.company}</Text>
                            <Text style={styles.projectSubtitle}>{exp.duration}</Text>
                        </View>
                        <Text style={{ ...styles.projectSubtitle, marginBottom: 4 }}>{exp.description}</Text>
                        {exp.highlights.map((highlight, j) => (
                            <View key={j} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.bulletText}>{highlight}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>

            {/* Projects */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Selected Projects</Text>
                {data.projects.slice(0, 3).map((proj, i) => (
                    <View key={i} style={{ marginBottom: 10 }}>
                        <Text style={styles.projectTitle}>{proj.title}</Text>
                        <Text style={styles.projectSubtitle}>{proj.techStack.join(' • ')}</Text>
                        <Text style={styles.projectDesc}>{proj.description}</Text>
                        {proj.highlights && proj.highlights.map((h, j) => (
                            <View key={j} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={styles.bulletText}>{h}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {data.skills.map((category, i) => (
                    <Text key={i} style={styles.skillsText}>
                        <Text style={styles.projectTitle}>{category.category}: </Text>
                        <Text>{category.items.map(item => item.name).join(', ')}</Text>
                    </Text>
                ))}
            </View>

        </Page>
    </Document>
);
