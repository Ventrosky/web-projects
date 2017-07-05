<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:tei="http://www.tei-c.org/ns/1.0" xmlns="http://www.w3.org/1999/xhtml"> 
<xsl:output method="html" indent="yes" omit-xml-declaration="yes"/>
    <xsl:template match="tei:TEI">
        <html>
            <head>
                <link href="stile.css" rel="stylesheet" type="text/css"/>
                <title>"The Right to Read"</title>
                <!-- Internet Explorer HTML5 enabling script: -->
                <!--[if IE]>
                    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
                    <style type="text/css">
                        .clear {
                            zoom: 1;
                            display: block;
                        }
                    </style>
                <![endif]-->
            </head>
            <body>
                <div class="section" id="page">
                    <xsl:apply-templates/>
                </div>
                <div class="footer">
                    <div class="line"></div>
                    <p>Progetto di Codifica di Testi a.a. 2016/2017</p>
                    <a href="#" class="up"> Back UP </a>
                    <a href="https://github.com/Ventrosky" class="by">by Salvatore Ventrone</a>
                </div>
                <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
                <script type="text/javascript" src="jquery.scrollTo-1.4.2/jquery.scrollTo-min.js"></script>
                <script type="text/javascript" src="script.js"></script>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="tei:teiHeader">
        <div class="header">
            <div class="nav clear">
                <ul>
                    <li><a href="#part1">Short Story</a></li>
                    <li><a href="#part2">Author’s Notes</a></li>
                    <li><a href="#part3">Bad News</a></li>
                </ul>
            </div>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="tei:front">
        <div class="fronte">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="tei:body">
        <div class="section" id="articles">
            <div class="line"></div>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="tei:titleStmt">
        <div class="titolo">
            <h4><i><xsl:value-of select="tei:author"/></i></h4><hr/>
        <h3><xsl:value-of select="tei:title"/></h3>
        
        <h5><xsl:value-of select="tei:respStmt"/></h5>
        </div>
    </xsl:template>
    <xsl:template match="tei:publicationStmt">
        <div class="info">
        <h4>Informazioni sulla pubblicazione</h4>
        <ul>
            <li><b>Edizione originale</b>: <xsl:value-of select="tei:distributor"/> <xsl:value-of select="tei:pubPlace"/>;</li>
            <li><b>Edizione elettronica</b>: <xsl:value-of select="tei:publisher"/>;</li>
            <li><b>Ultima revisione</b>: <xsl:value-of select="tei:date"/>;</li>
        </ul>
        </div>
    </xsl:template>
    <xsl:template match="//tei:sourceDesc/tei:bibl">
        <div class="info">
            <h4>Informazioni bibliografiche</h4>
            <ul>
                <li><b>Titolo</b>: <xsl:value-of select="tei:title"/> <xsl:value-of select="tei:pubPlace"/>;</li>
                <li><b>Autore</b>: <xsl:value-of select="tei:author"/>;</li>
                <li><b>ISBN</b>: <xsl:value-of select="tei:idno"/></li>
                <li><b>Data</b>: <xsl:value-of select="tei:date"/>;</li>
            </ul>
        </div>
    </xsl:template>
    <xsl:template match="tei:encodingDesc">
        <div class="info">
            <h4>Informazioni sul progetto</h4>
            <p>
                <xsl:value-of select="tei:projectDesc"/>
            </p>
        </div>
    </xsl:template>
    <xsl:template match="tei:p">
        <p>
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="tei:list">
        <ul>
            <xsl:apply-templates/>
        </ul>
    </xsl:template>
    <xsl:template match="tei:item">
        <li>
            <xsl:apply-templates/>
        </li>
    </xsl:template>
    <xsl:template match="tei:q">
        <q>
            <xsl:apply-templates/>
        </q>
    </xsl:template>
    <xsl:template match="tei:ref">
        <a href="{@target}" target="_blank">
            <xsl:apply-templates/>
        </a>
    </xsl:template>
    <xsl:template match="tei:div">
        <div class="article" id="{@type}">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="//tei:div/tei:head">
        <h2 class="t_section">
            <xsl:apply-templates/>
        </h2>
        <div class="line"></div>
    </xsl:template>
    <xsl:template match="tei:titlePage">
        <div class="titlePage">
            <h2><xsl:value-of select="tei:byline"/></h2>
            <h3><xsl:value-of select="tei:docTitle"/></h3>
        </div>
        <br/>
    </xsl:template>   
    <xsl:template match="tei:emph">
        <em><xsl:apply-templates/></em>
    </xsl:template>
    <xsl:template match="tei:name">
        <ul class="name">
            <li class="text_name"><xsl:apply-templates/></li>
            <li class="type_name"><b>Type</b>: name - <xsl:value-of select="@type"/><br/></li>
        </ul>
    </xsl:template>
    <xsl:template match="tei:persName">
        <ul class="name">
            <li class="text_name"><xsl:apply-templates/></li>
            <li class="type_name"><b>Type</b>: personal<br/></li>
        </ul>
    </xsl:template>
    <xsl:template match="tei:geogName">
        <ul class="name">
            <li class="text_name"><xsl:apply-templates/></li>
            <li class="type_name"><b>Type</b>: geographical<br/></li>
        </ul>
    </xsl:template>
    <xsl:template match="tei:placeName">
        <ul class="name">
            <li class="text_name"><xsl:apply-templates/></li>
            <li class="type_name"><b>Type</b>: place - <xsl:value-of select="@type"/><br/></li>
        </ul>
    </xsl:template>
    <xsl:template match="tei:orgName">
        <ul class="name">
            <li class="text_name"><xsl:apply-templates/></li>
            <li class="type_name"><b>Type</b>: organization - <xsl:value-of select="@type"/><br/></li>
        </ul>
    </xsl:template>
    <xsl:template match="tei:figure">
        <div class="figure">
            <img>
               <xsl:attribute name="src">    
               <xsl:value-of select="tei:graphic/@url"/>
               </xsl:attribute>
               <xsl:attribute name="alt">    
               <xsl:value-of select="tei:figDesc"/>
               </xsl:attribute>
            </img>
        </div>
    </xsl:template>
</xsl:stylesheet>
