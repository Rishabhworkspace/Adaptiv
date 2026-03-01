import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import { PersonalizedData, RecruiterContext } from '@/components/portfolio/PortfolioProvider';

// Styles matching Reference Image 2 — all ASCII-safe, no emoji
const styles = StyleSheet.create({
    page: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 35,
        paddingRight: 35,
        fontFamily: 'Helvetica',
        fontSize: 9.5,
        color: '#333333',
        lineHeight: 1.45,
    },

    // ---- HEADER ----
    header: {
        marginBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: '#2563EB',
        paddingBottom: 12,
    },
    name: {
        fontSize: 22,
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    roleTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#2563EB',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    contactRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        fontSize: 8.5,
        color: '#333333',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactSeparator: {
        marginHorizontal: 4,
        color: '#999999',
        fontSize: 8,
    },
    contactLink: {
        color: '#333333',
        textDecoration: 'none',
    },

    // ---- MAIN TWO-COLUMN LAYOUT ----
    mainLayout: {
        flexDirection: 'row',
        gap: 18,
    },
    leftColumn: {
        flex: 0.62,
    },
    rightColumn: {
        flex: 0.38,
        paddingLeft: 14,
        borderLeftWidth: 1,
        borderLeftColor: '#e0e0e0',
    },

    // ---- SECTIONS ----
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
        textTransform: 'uppercase',
        borderBottomWidth: 1.5,
        borderBottomColor: '#2563EB',
        paddingBottom: 3,
        marginBottom: 8,
        marginTop: 14,
        letterSpacing: 1,
    },
    firstSectionTitle: {
        marginTop: 0,
    },

    // ---- TEXT ELEMENTS ----
    paragraph: {
        fontSize: 9.5,
        marginBottom: 8,
        color: '#333333',
        textAlign: 'justify',
    },

    // ---- EXPERIENCE & PROJECTS ----
    itemBlock: {
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 10.5,
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
        marginBottom: 1,
    },
    itemSubtitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
    },
    itemCompany: {
        fontSize: 9.5,
        fontFamily: 'Helvetica-Bold',
        color: '#2563EB',
    },
    itemDetails: {
        fontSize: 8.5,
        color: '#666666',
        fontFamily: 'Helvetica-Oblique',
    },
    itemDescription: {
        fontSize: 9.5,
        marginBottom: 3,
        color: '#444444',
    },
    bulletPointContainer: {
        flexDirection: 'row',
        marginBottom: 2,
        paddingLeft: 6,
    },
    bullet: {
        width: 8,
        fontSize: 9,
        color: '#2563EB',
    },
    bulletText: {
        flex: 1,
        fontSize: 9,
    },

    // ---- SKILLS (Right Column) ----
    skillCategory: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 9.5,
        marginBottom: 2,
        color: '#000000',
    },
    skillListRow: {
        marginBottom: 7,
    },
    skillItemsText: {
        fontSize: 8.5,
        color: '#444444',
        lineHeight: 1.5,
    },

    // ---- STRENGTHS / WHY ME (Right Column) ----
    strengthItem: {
        marginBottom: 6,
    },
    strengthTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
    },
    strengthBullet: {
        color: '#2563EB',
        fontSize: 9,
        marginRight: 5,
        width: 8,
    },
    strengthTitle: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 9,
        color: '#000000',
    },
    strengthDesc: {
        fontSize: 8.5,
        color: '#555555',
        paddingLeft: 12,
    },

    // ---- PROJECTS (Right Column) ----
    projectTech: {
        fontSize: 8,
        color: '#666666',
        fontFamily: 'Helvetica-Oblique',
        marginTop: 2,
    },
});

interface ResumePDFProps {
    data: PersonalizedData;
    context: RecruiterContext | null;
}

export const ResumePDF = ({ data, context }: ResumePDFProps) => {
    const displayRole = context
        ? `${context.role} | Software Engineering & Development`
        : data.profile.title;

    // Shorten URLs for display
    const shortenUrl = (url: string) =>
        url.replace('https://www.', '').replace('https://', '').replace(/\/$/, '');

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* ---- HEADER ---- */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.profile.name}</Text>
                    <Text style={styles.roleTitle}>{displayRole.toUpperCase()}</Text>

                    <View style={styles.contactRow}>
                        <View style={styles.contactItem}>
                            <Link src={`mailto:${data.profile.email}`} style={styles.contactLink}>
                                {data.profile.email}
                            </Link>
                        </View>
                        <Text style={styles.contactSeparator}>|</Text>

                        <View style={styles.contactItem}>
                            <Text style={styles.contactLink}>{data.profile.location}</Text>
                        </View>

                        {data.profile.links.linkedin ? (
                            <>
                                <Text style={styles.contactSeparator}>|</Text>
                                <View style={styles.contactItem}>
                                    <Link src={data.profile.links.linkedin} style={styles.contactLink}>
                                        {shortenUrl(data.profile.links.linkedin)}
                                    </Link>
                                </View>
                            </>
                        ) : null}

                        {data.profile.links.github ? (
                            <>
                                <Text style={styles.contactSeparator}>|</Text>
                                <View style={styles.contactItem}>
                                    <Link src={data.profile.links.github} style={styles.contactLink}>
                                        {shortenUrl(data.profile.links.github)}
                                    </Link>
                                </View>
                            </>
                        ) : null}
                    </View>
                </View>

                {/* ---- TWO COLUMN LAYOUT ---- */}
                <View style={styles.mainLayout}>

                    {/* ===== LEFT COLUMN ===== */}
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
                                    <Text style={styles.itemDetails}>
                                        {exp.duration}{exp.location ? ` | ${exp.location}` : ''}
                                    </Text>
                                </View>
                                <Text style={styles.itemDescription}>{exp.description}</Text>
                                {exp.highlights.map((highlight, j) => (
                                    <View key={j} style={styles.bulletPointContainer}>
                                        <Text style={styles.bullet}>&#8226;</Text>
                                        <Text style={styles.bulletText}>{highlight}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}

                        {/* EDUCATION */}
                        <Text style={styles.sectionTitle}>EDUCATION</Text>
                        {data.education ? data.education.map((edu, i) => (
                            <View key={i} style={styles.itemBlock}>
                                <Text style={styles.itemTitle}>{edu.degree}</Text>
                                <View style={styles.itemSubtitleRow}>
                                    <Text style={styles.itemCompany}>{edu.institution}</Text>
                                    <Text style={styles.itemDetails}>
                                        {edu.duration}{edu.location ? ` | ${edu.location}` : ''}
                                    </Text>
                                </View>
                                {edu.gpa ? <Text style={styles.itemDetails}>CGPA: {edu.gpa}</Text> : null}
                            </View>
                        )) : null}

                    </View>

                    {/* ===== RIGHT COLUMN ===== */}
                    <View style={styles.rightColumn}>

                        {/* SKILLS */}
                        <Text style={[styles.sectionTitle, styles.firstSectionTitle]}>SKILLS</Text>
                        {data.skills.map((category, i) => (
                            <View key={i} style={styles.skillListRow}>
                                <Text style={styles.skillCategory}>{category.category}</Text>
                                <Text style={styles.skillItemsText}>
                                    {category.items.map(item => item.name).join('  |  ')}
                                </Text>
                            </View>
                        ))}

                        {/* STRENGTHS / WHY CHOOSE ME */}
                        {context && data.whyMe ? (
                            <>
                                <Text style={styles.sectionTitle}>STRENGTHS</Text>
                                {data.whyMe.points.map((point, i) => (
                                    <View key={i} style={styles.bulletPointContainer}>
                                        <Text style={styles.strengthBullet}>-</Text>
                                        <Text style={{ ...styles.bulletText, fontSize: 8.5 }}>{point}</Text>
                                    </View>
                                ))}
                            </>
                        ) : null}

                        {/* PROJECTS */}
                        <Text style={styles.sectionTitle}>PROJECTS</Text>
                        {data.projects.slice(0, 3).map((proj, i) => (
                            <View key={i} style={styles.itemBlock}>
                                <Text style={styles.itemTitle}>{proj.title}</Text>
                                <Text style={styles.itemDescription}>{proj.description}</Text>
                                <Text style={styles.projectTech}>
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
