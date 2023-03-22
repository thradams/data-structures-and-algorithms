[Main](README.md) > [Dynamic Arrays](dynamic_arrays.md) > Sample 5 - dynamic arrays of onwer pointer of books. onwership transfered unconditionally

```c

/*
 * Sample 4 - dynamic arrays of onwer pointer of books. onwership transfered
 */


#pragma once
#include <stdlib.h>
#include <assert.h>
#include <errno.h>
#include <stdio.h>
#include <string.h>

#ifdef _MSC_VER
#define strdup _strdup
#endif

struct book {
    char* title;
};

void book_delete(struct book* book)
{
    if (book != NULL)
    {
        free(book->title);
        free(book);
    }
}

struct books {
    struct book** data;
    int size;
    int capacity;
};

int int_array_reserve(struct books* books, int n)
{
    /*pre condition*/
    assert(books != NULL);

    if (n > books->capacity) {

        static_assert(sizeof(books->data[0]) < INT_MAX,
            "we assume sizeof data is less than int max");

        static_assert((size_t)INT_MAX * (size_t)INT_MAX < SIZE_MAX,
            "we assume size_t is 2x bigger than int, consequently will not overflow");


        const size_t new_size_bytes = n * sizeof(books->data[0]);
        void* pnew = realloc(books->data, new_size_bytes);
        if (pnew)
        {
            books->data = pnew;
            books->capacity = n;
        }
        else
        {
            return ENOMEM;
        }
    }

    return 0;
}

int books_push(struct books* books, struct book* book)
{
    /*pre condition*/
    assert(books != NULL);
    assert(book != NULL);

    if (books->size == INT_MAX) {
        book_delete(book);
        return EOVERFLOW;
    }

    if (books->size + 1 > books->capacity) {

        unsigned long long new_capacity =
            books->capacity + books->capacity / 2;


        if (new_capacity < books->size + 1)
        {
            //cover first and second insertion
            new_capacity = books->size + 1;
        }
        else if (new_capacity > INT_MAX)
        {
            //cover last possible insertion
            new_capacity = INT_MAX;
        }

        int error = int_array_reserve(books, (int)new_capacity);
        if (error != 0) {
            book_delete(book);
            return error;
        }
    }

    books->data[books->size] = book; /*MOVED*/
    books->size++;

    return 0;
}

void books_destroy(struct books* books)
{
    /*pre condition*/
    assert(books != NULL);

    for (int i = 0; i < books->size; i++) {
        book_delete(books->data[i]);
    }
    free(books->data);
}

#define try if (1)
#define throw goto CATCH_BLOCK
#define catch else CATCH_BLOCK:

int main()
{
    struct books books = { 0 };
    struct book* book = NULL;
    try
    {
        book = calloc(1, sizeof(struct book));
        if (book == NULL) throw;
        book->title = strdup("title 1");
        if (book->title == NULL) throw;
        books_push(&books, book/*MOVED*/);
        book = NULL; //unconditionally moved
    }
    catch {
    }

    book_delete(book);
    books_destroy(&books);
}

```

