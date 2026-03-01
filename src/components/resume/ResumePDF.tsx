import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { PersonalizedData, RecruiterContext } from '@/components/portfolio/PortfolioProvider';

// Create styles matching Reference Image 2
const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 35,
        paddingLeft: 40,
        paddingRight: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#333333',
        lineHeight: 1.4,
    },
    // ---- HEADER ----
    header: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingBottom: 15,
    },
    name: {
        fontSize: 26,
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
        marginBottom: 4,
    },
    roleTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: '#2563EB', // Blue accent
        marginBottom: 8,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        fontSize: 9,
        color: '#000000',
        fontFamily: 'Helvetica-Bold',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactIcon: {
        color: '#2563EB',
        marginRight: 4,
    },
    contactLink: {
        color: '#000000',
        textDecoration: 'none',
    },

    // ---- MAIN TWO-COLUMN LAYOUT ----
    mainLayout: {
        flexDirection: 'row',
        gap: 20,
    },
    leftColumn: {
        flex: 0.65, // ~65% width
    },
    rightColumn: {
        flex: 0.35, // ~35% width
    },

    // ---- SECTIONS ----
    sectionTitle: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        paddingBottom: 2,
        marginBottom: 8,
        marginTop: 15,
    },
    firstSectionTitle: {
        marginTop: 0, // Remove top margin for the first sections in columns
    },

    // ---- TEXT ELEMENTS ----
    paragraph: {
        fontSize: 10,
        marginBottom: 10,
        color: '#333333',
        textAlign: 'justify',
    },

    // ---- EXPERIENCE & PROJECTS ----
    itemBlock: {
        marginBottom: 12,
    },
    itemHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 2,
    },
    itemTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
    },
    itemSubtitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    itemCompany: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#2563EB',
    },
    itemDetails: {
        fontSize: 9,
        color: '#666666',
    },
    itemDescription: {
        fontSize: 10,
        marginBottom: 4,
    },
    bulletPointContainer: {
        flexDirection: 'row',
        marginBottom: 3,
        paddingLeft: 4,
    },
    bullet: {
        width: 10,
        fontSize: 10,
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
    },

    // ---- SKILLS (Right Column) ----
    skillCategory: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 10,
        marginBottom: 3,
        color: '#000000',
    },
    skillListRow: {
        marginBottom: 8,
    },
    skillItemsText: {
        fontSize: 9,
        color: '#333333',
    },

    // ---- STRENGTHS / WHY ME (Right Column) ----
    strengthItem: {
        marginBottom: 8,
    },
    strengthTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    strengthIcon: {
        color: '#2563EB',
        fontSize: 12,
        marginRight: 4,
    },
    strengthTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 10,
        color: '#000000',
    },
    strengthDesc: {
        fontSize: 9,
        color: '#555555',
        paddingLeft: 14,
    },
});

interface ResumePDFProps {
    data: PersonalizedData;
    context: RecruiterContext | null;
}

export const ResumePDF = ({ data, context }: ResumePDFProps) => {
    // Custom Role Title if context exists, otherwise default title
    const displayRole = context ? `${context.role} | Software Engineering & Development` : data.profile.title;

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* ---- HEADER ---- */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.profile.name}</Text>
                    <Text style={styles.roleTitle}>{displayRole.toUpperCase()}</Text>

                    <View style={styles.contactRow}>
                        <View style={styles.contactItem}>
                            <Text style={styles.contactIcon}>@</Text>
                            <Link src={`mailto:${data.profile.email}`} style={styles.contactLink}>
                                {data.profile.email}
                            </Link>
                        </View>
                        <View style={styles.contactItem}>
                            <Text style={styles.contactIcon}>📍</Text>
                            <Text>{data.profile.location}</Text>
                        </View>
                        {data.profile.links.linkedin && (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactIcon}>in</Text>
                                <Link src={data.profile.links.linkedin} style={styles.contactLink}>
                                    {data.profile.links.linkedin.replace('https://www.', '').replace('https://', '')}
                                </Link>
                            </View>
                        )}
                        {data.profile.links.github && (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactIcon}>🐙</Text>
                                <Link src={data.profile.links.github} style={styles.contactLink}>
                                    {data.profile.links.github.replace('https://www.', '').replace('https://', '')}
                                </Link>
                            </View>
                        )}
                    </View>
                </View>

                {/* ---- TWO COLUMN LAYOUT ---- */}
                <View style={styles.mainLayout}>

                    {/* ===== LEFT COLUMN (~65%) ===== */}
                    <View style={styles.leftColumn}>

                        {/* SUMMARY */}
                        <Text style={[styles.sectionTitle, styles.firstSectionTitle]}>SUMMARY</Text>
                        <Text style={styles.paragraph}>{data.profile.bio}</Text>

                        {/* EXPERIENCE */}
                        <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                        {data.experience.map((exp, i) => (
                            <View key={i} style={styles.itemBlock}>
                                <Text style={styles.itemTitle}>{exp.role}</Text>
                                <View style={styles.itemSubtitleRow}>
                                    <Text style={styles.itemCompany}>{exp.company}</Text>
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Text style={styles.itemDetails}>🗓 {exp.duration}</Text>
                                        <Text style={styles.itemDetails}>📍 {exp.location || 'Remote'}</Text>
                                    </View>
                                </View>
                                <Text style={styles.itemDescription}>{exp.description}</Text>
                                {exp.highlights.map((highlight, j) => (
                                    <View key={j} style={styles.bulletPointContainer}>
                                        <Text style={styles.bullet}>•</Text>
                                        <Text style={styles.bulletText}>{highlight}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}

                        {/* EDUCATION */}
                        <Text style={styles.sectionTitle}>EDUCATION</Text>
                        {data.education && data.education.map((edu, i) => (
                            <View key={i} style={styles.itemBlock}>
                                <Text style={styles.itemTitle}>{edu.degree}</Text>
                                <View style={styles.itemSubtitleRow}>
                                    <Text style={styles.itemCompany}>{edu.institution}</Text>
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Text style={styles.itemDetails}>🗓 {edu.duration}</Text>
                                        {edu.location && <Text style={styles.itemDetails}>📍 {edu.location}</Text>}
                                    </View>
                                </View>
                                {edu.gpa && <Text style={styles.itemDetails}>CGPA: {edu.gpa}</Text>}
                            </View>
                        ))}

                    </View>

                    {/* ===== RIGHT COLUMN (~35%) ===== */}
                    <View style={styles.rightColumn}>

                        {/* SKILLS */}
                        <Text style={[styles.sectionTitle, styles.firstSectionTitle]}>SKILLS</Text>
                        {data.skills.map((category, i) => (
                            <View key={i} style={styles.skillListRow}>
                                <Text style={styles.skillCategory}>{category.category}</Text>
                                <Text style={styles.skillItemsText}>
                                    {category.items.map(item => item.name).join('  •  ')}
                                </Text>
                            </View>
                        ))}

                        {/* STRENGTHS / WHY CHOOSE ME (from AI Context) */}
                        {context && data.whyMe && (
                            <>
                                <Text style={styles.sectionTitle}>STRENGTHS</Text>
                                {data.whyMe.points.map((point, i) => {
                                    // Split the point into a bold title and description if possible (e.g. "Title: Description")
                                    const parts = point.split(':');
                                    const title = parts.length > 1 ? parts[0] : `Strength ${i + 1}`;
                                    const desc = parts.length > 1 ? parts.slice(1).join(':').trim() : point;

                                    return (
                                        <View key={i} style={styles.strengthItem}>
                                            <View style={styles.strengthTitleRow}>
                                                <Text style={styles.strengthIcon}>★</Text>
                                                <Text style={styles.strengthTitle}>{title}</Text>
                                            </View>
                                            <Text style={styles.strengthDesc}>{desc}</Text>
                                        </View>
                                    );
                                })}
                            </>
                        )}

                        {/* PROJECTS */}
                        <Text style={styles.sectionTitle}>PROJECTS</Text>
                        {data.projects.slice(0, 3).map((proj, i) => (
                            <View key={i} style={styles.itemBlock}>
                                <Text style={styles.itemTitle}>{proj.title}</Text>
                                <Text style={styles.itemDescription}>{proj.description}</Text>
                                <Text style={{ ...styles.skillItemsText, marginTop: 4, fontFamily: 'Helvetica-Oblique' }}>
                                    Tech: {proj.techStack.join(', ')}
                                </Text>
                            </View>
                        ))}

                    </View>

                </View>

            </Page>
        </Document>
    );
};
