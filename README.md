# Growing Futures - Admin App

Die Arbeit wurde zum Teil finanziert durch den [Prototype
Fund](https://prototypefund.de) mit Mitteln des Bundesministeriums für Bildung
und Forschung sowied der Unterstützung durch
die Open Knowledge Foundation.

![Prototype Fund](img/logo-prototype.svg)
![Bundesministerium für Bildung und Forschung](img/logo-bmbf.svg)
![Open Knowledge Foundation Deutschland](img/logo-okfn.svg)


# Growing Futures Gärtner App

Die Gärtner-App ist die Verwaltungsoberfläche der Growing-Futures App. Hier
haben Gärtner und Organisatoren von Solidarischen Landwirtschaft die
Möglichkeit die Planung der Ausgabe sowie das Einsammeln von Rückmeldungen
leichter zu gestalten. Die App bietet die Möglichkeit:

1. Ernten zu registrieren um ein Inventar zu pflegen
2. Die Verwaltung von Ausgabestellen, Mitgliedern, Anteilsgrößen und Kulturen
  inklusive für den Anbau notwendiger Informationen
3. Jahresfeedback zu Kulturen, Mengen, Haushaltsgrößen und Präferenzen
   einsammeln
4. Feedback zu einzelnen Lieferungen der Solawi einsammeln
5. Die Ausgabe der geernteten/zu erntenden Mengen planen auf vier verschiedenen Arten und Weisen. Zwei davon sind implementiert, die anderen beiden sind in Progress
   - SoLawi-Standardausgabe
   - Individuelle Anteilsberechnung
   - Freie Entnahmeplanung
   - Einzellieferung

## Ausgabealgorithmen

### SoLawi Standardausgabe

Anhand von definierten Anteilsgrößen (z.B. klein, mittel, groß) mit
hinterlegten Faktoren der Relation dieser zueinander können die einzelnen
Kisten geplant werden. Die Planung verrechnet das Inventar mit den gesamt zu
erntenden Mengen, gibt Auskünft über den gesamtbedarf, die Inhalte der
einzelnen Anteilsgrößen und auch die Verteilung an die einzelnen
Verteilstationen.

Features die noch implementiert werden:
1. Hinzufügen von Ausnahmen für Ausgabestellen (z.B. nur Tomaten in
   Ausgabestelle 1) und Einzelpersonen.
2. Darstellung des Fairness-Faktors der einzelnen Anteile aufgrund der
   hinterlegten "internen Kosten" für einzelne Gemüskulturen. Dies soll es den
   Gärtner erleichtern die Anteile leichter zu planen.
3. Vorschläge für die Anteilsgrößen aufgrund der 
4. Bessere Aufteilung des Puffers für einzelne Gemüsesorten

### Individualisierte Ausgabe
Anhand der Rückmeldungen der Präferenzen der einzelnen Mitglieder und der
Haushaltsgröße eben jener Mitglieder besteht die Möglichkeit, dass pro
gegebener Kultur sowohl die Aufteilung der geernteten Mengen, als auch der
Vorschlag für zu erntende Kulturen berücksichtigt wird. Dies ermöglicht die
Ausgabe nach den Präferenzen der Mitglieder.

Features die noch implementiert werden:
1. Tracking der "internen Kosten" über das Jahr hinweg um neben
   individualisierten Aneilsmengen auch eine individualisierten Richtwert für
   die Bezahlung ausgeben zu können

### Freie Entnahme 
(only Backend und Member-App, Admin-Oberfläche fehlt noch)

Bei der freien Entnahme ist es dem Gärtner überlassen die beerntbaren Kulturen
zu definieren, diese werden mit einem Maximum der Entnahme versehen sowie einem
Indikator (viel, mittel, wenig) als Rückmeldung für die Mitglieder. Dies wird
den Mitgliedern Anfang der Woche freigeschalten, sie können dann wie in einem
online-shop bestellen. Die aggregierte Menge von zu erntenden Gemüse wird dem
Gärtner dargestellt, bei Über/Unterproduktion ist es dem Gärtner möglich die
Ernte einzelner Gemüse anzupassen und diese so an die Mitglieder auszugeben.

### Einzellieferung

Hier kann einfach eine gewisse Menge an Gemüse für eine einzelne Lieferung
bereitgestellt werden.
