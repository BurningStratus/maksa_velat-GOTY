from SQL_Scripts import sql_connection as sql

class Query:
    def __init__(self, qry):
        self.query = qry
        
    def executeSQL(self):
        sql.kursori.execute(self.query)

        if sql.kursori.rowcount == 1:
            print("SQL query successful")
        else:
            print("SQL query failed")

def load_events():
    ### new version for classes >:(
    # clear_old_players = Query("delete from game;")

    clear_events = Query('''UPDATE airport SET event_id = 0;''')
    add_quests = Query('''update airport set event_id=(select id from event where event_name=airport_name)
                    where exists (select 1 from event where event_name=airport_name);''')
    add_bandits = Query('''UPDATE airport 
                        SET event_id = 13 
                        WHERE event_id = 0 
                        ORDER BY RAND() 
                        LIMIT 5;''')
    add_black_cat = Query('''UPDATE airport 
                        SET event_id=11 
                        WHERE event_id=0 
                        ORDER BY RAND() 
                        LIMIT 1;''')
    add_blown_engine = Query('''UPDATE airport 
                        SET event_id=12 
                        WHERE event_id=0 
                        ORDER BY RAND() 
                        LIMIT 1;''')
    add_fundraiser = Query('''UPDATE airport 
                        SET event_id=14 
                        WHERE event_id=0 
                        ORDER BY RAND() 
                        LIMIT 1;''')
    add_plant_trees = Query('''UPDATE airport 
                        SET event_id=15 
                        WHERE event_id=0 
                        ORDER BY RAND() 
                        LIMIT 1;''')
    add_chess = Query('''UPDATE airport
                        SET event_id = 17
                        WHERE event_id = 0
                        ORDER BY RAND()
                        LIMIT 1;''')

    init_game = [
        clear_events,
        add_quests,
        add_bandits,
        add_black_cat,
        add_blown_engine,
        add_fundraiser,
        add_plant_trees,
        add_chess
            ]
    for qry in init_game:
        qry.executeSQL()

    return 'SQL executed'
    ###
'''
    # Clearing Old players
    sql.kursori.execute("delete from game;")

    # Clearing old events from database
    sql.kursori.execute("UPDATE airport "
                        "SET event_id = 0;")
    if sql.kursori.rowcount == 1:
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    else:
        print("-------------------------------------------------------------------------------------------------------")

    # Adds quests
    sql.kursori.execute("update airport set event_id=(select id from event where event_name=airport_name)"
                        " where exists (select 1 from event where event_name=airport_name);")
    if sql.kursori.rowcount == 1:
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    else:
        print("-------------------------------------------------------------------------------------------------------")

    # Adding bandits
    sql.kursori.execute("UPDATE airport "
                        "SET event_id = 13 "
                        "WHERE event_id = 0 "
                        "ORDER BY RAND() "
                        "LIMIT 5;")
    if sql.kursori.rowcount == 1:
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    else:
        print("-------------------------------------------------------------------------------------------------------")

    # Adding Black Cat event
    sql.kursori.execute("UPDATE airport "
                        "SET event_id=11 "
                        "WHERE event_id=0 "
                        "ORDER BY RAND() "
                        "LIMIT 1;")
    if sql.kursori.rowcount == 1:
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    else:
        print("-------------------------------------------------------------------------------------------------------")
'''